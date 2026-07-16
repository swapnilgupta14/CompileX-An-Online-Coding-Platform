"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ArrowLeft, Check, Trophy, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { battleApi } from "@/lib/api/battle";
import { mockLeaderboard } from "@/lib/api/mock";
import { toDifficulty } from "@/lib/problems/difficulty";
import { STARTERS, type Lang } from "@/lib/problems/starters";
import { useWebSocket } from "@/hooks/use-websocket";
import { CodeEditor, type EditorTheme } from "@/components/coding/CodeEditor";
import { EditorToolbar } from "@/components/coding/EditorToolbar";
import { OutputPanel, type OutputState } from "@/components/coding/OutputPanel";
import { DifficultyBadge } from "@/components/dashboard/DifficultyBadge";
import { cn } from "@/lib/cn";
import type {
  BattleCodeRes,
  BattlegroundCodeReq,
  LeaderboardRow,
  PlaygroundCodeReq,
  PlaygroundCodeRes,
  TestResult,
} from "@/lib/api/types";

interface Props {
  roomId: string;
  userId: string;
}

type OutputTab = "results" | "custom";

export function BattlegroundPlayClient({ roomId, userId }: Props) {
  const problems = useQuery({
    queryKey: ["battle-problems", roomId],
    queryFn: () =>
      battleApi.getProblemsByRoom(roomId).then((r) => r.responseData ?? []),
  });

  const [current, setCurrent] = useState(0);
  const [language, setLanguage] = useState<Lang>("cpp");
  const [theme, setTheme] = useState<EditorTheme>("auto");
  const [fontSize, setFontSize] = useState(15);
  const [buffers, setBuffers] = useState<Record<string, string>>({});
  const [tab, setTab] = useState<OutputTab>("results");
  const [customInput, setCustomInput] = useState("");

  const [runResults, setRunResults] = useState<TestResult[] | null>(null);
  const [runState, setRunState] = useState<OutputState>("IDLE");

  const [customOutput, setCustomOutput] = useState("");
  const [customState, setCustomState] = useState<OutputState>("IDLE");
  const [customExec, setCustomExec] = useState<number | null>(null);

  // Seed the leaderboard with the deterministic mock so it looks alive
  // before the socket delivers a real snapshot. First socket message
  // replaces it entirely.
  const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>(() =>
    mockLeaderboard(roomId),
  );

  const battle = useWebSocket<BattlegroundCodeReq, BattleCodeRes>(
    `/battle/code_execute/${roomId}/`,
    {
      onMessage: (msg) => {
        if (msg.event === "runner") {
          if (Array.isArray(msg.responseData)) {
            setRunResults(msg.responseData);
            setRunState("SUCCESS");
          } else {
            setRunResults(null);
            setRunState("ERROR");
            setCustomOutput(String(msg.responseData));
          }
        } else if (msg.event === "leaderboard") {
          setLeaderboard(msg.responseData);
        }
        return false; // don't overwrite `message` — we handle it here
      },
    },
  );

  const pg = useWebSocket<PlaygroundCodeReq, PlaygroundCodeRes>(
    "/pg/code_execute",
    {
      onMessage: (msg) => {
        const data = msg.responseData;
        if (data.error && "details" in data.data) {
          setCustomOutput(data.data.message);
          setCustomState("ERROR");
          setCustomExec(null);
        } else if ("output" in data.data) {
          setCustomOutput(data.data.output);
          setCustomState("SUCCESS");
          setCustomExec(data.data.exec_time);
        }
      },
    },
  );

  const currentProblem = problems.data?.[current];
  const currentCode = useMemo(() => {
    if (!currentProblem) return STARTERS[language];
    return buffers[currentProblem.p_id] ?? STARTERS[language];
  }, [buffers, currentProblem, language]);

  const onCodeChange = (v: string) => {
    if (!currentProblem) return;
    setBuffers((prev) => ({ ...prev, [currentProblem.p_id]: v }));
  };

  const onRun = () => {
    if (!currentProblem) return;
    if (tab === "custom") {
      setCustomState("LOADING");
      setCustomOutput("");
      setCustomExec(null);
      pg.send({ code: currentCode, input: customInput });
    } else {
      setRunState("LOADING");
      setRunResults(null);
      battle.send({
        code: currentCode,
        p_id: currentProblem.p_id,
        uid: userId,
      });
    }
  };

  if (problems.isLoading) {
    return <PlaySkeleton />;
  }
  if (problems.isError || !problems.data || problems.data.length === 0) {
    return (
      <div className="mx-auto max-w-md rounded-2xl bg-surface p-8 ring-1 ring-hairline">
        <div className="text-[15px] font-medium">Room isn&apos;t ready.</div>
        <p className="mt-1 text-[13px] text-muted">
          The room has no problems yet, or the battlefield service is down.
        </p>
        <Link
          href="/app/battlegrounds"
          className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to rooms
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex   flex-col gap-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/app/battlegrounds"
          className="inline-flex items-center gap-1 text-[12px] font-medium text-muted hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Rooms
        </Link>
        <div className="flex items-center gap-1 rounded-full bg-surface p-1 ring-1 ring-hairline">
          {problems.data.map((p, i) => {
            const active = i === current;
            return (
              <button
                key={p.p_id}
                type="button"
                onClick={() => setCurrent(i)}
                className={cn(
                  "h-8 rounded-full px-3 text-[12px] font-medium transition-colors",
                  active
                    ? "bg-surface-inverse text-surface-inverse-fg"
                    : "text-muted-strong hover:text-ink",
                )}
              >
                {i + 1}. {p.p_title}
              </button>
            );
          })}
        </div>
        <span className="rounded-full bg-surface px-3 py-1 text-[12px] font-medium text-muted-strong ring-1 ring-hairline">
          You · {userId.slice(0, 8)}
        </span>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="flex flex-col gap-3 lg:col-span-4">
          <div className="rounded-2xl bg-surface p-5 ring-1 ring-hairline">
            <div className="flex items-center justify-between">
              <div className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted">
                Problem {current + 1} of {problems.data.length}
              </div>
              {currentProblem ? (
                <DifficultyBadge value={toDifficulty(currentProblem.p_difficulty)} />
              ) : null}
            </div>
            <h2 className="mt-1 text-[18px] font-semibold tracking-[-0.02em]">
              {currentProblem?.p_title}
            </h2>
            <div className="prose prose-sm mt-3 max-w-none text-[13.5px] leading-relaxed text-ink">
              <ReactMarkdown>{currentProblem?.p_content ?? ""}</ReactMarkdown>
            </div>
          </div>

          <Leaderboard rows={leaderboard} yourUid={userId} />
        </div>

        <div className="flex flex-col gap-3 lg:col-span-8">
          <EditorToolbar
            language={language}
            onLanguage={setLanguage}
            theme={theme}
            onTheme={setTheme}
            fontSize={fontSize}
            onFontSize={setFontSize}
            onRun={onRun}
            running={
              tab === "custom"
                ? customState === "LOADING"
                : runState === "LOADING"
            }
            runLabel={tab === "custom" ? "Run" : "Submit"}
          />

          <div className="h-[420px]">
            <CodeEditor
              value={currentCode}
              language={language}
              theme={theme}
              fontSize={fontSize}
              onChange={onCodeChange}
            />
          </div>

          <div className="rounded-2xl bg-surface p-3 ring-1 ring-hairline">
            <div className="mb-3 flex items-center gap-1 rounded-full bg-bg p-1">
              {(["results", "custom"] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setTab(k)}
                  className={cn(
                    "h-7 flex-1 rounded-full text-[12px] font-medium transition-colors",
                    tab === k
                      ? "bg-surface-inverse text-surface-inverse-fg"
                      : "text-muted-strong hover:text-ink",
                  )}
                >
                  {k === "results" ? "Test results" : "Custom input"}
                </button>
              ))}
            </div>

            {tab === "custom" ? (
              <div className="flex flex-col gap-3">
                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  rows={4}
                  placeholder="Optional stdin"
                  className="w-full resize-none rounded-md bg-bg p-2.5 text-[12.5px] text-ink outline-none ring-1 ring-hairline focus:ring-focus"
                  spellCheck={false}
                />
                <OutputPanel
                  state={customState}
                  output={customOutput}
                  execTimeMs={customExec}
                />
              </div>
            ) : (
              <ResultsList state={runState} results={runResults} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Leaderboard({
  rows,
  yourUid,
}: {
  rows: LeaderboardRow[];
  yourUid: string;
}) {
  return (
    <div className="rounded-2xl bg-surface p-5 ring-1 ring-hairline">
      <div className="flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-surface-inverse text-surface-inverse-fg">
          <Trophy className="h-3 w-3" />
        </span>
        <div className="text-[13px] font-semibold tracking-[-0.015em]">
          Live leaderboard
        </div>
      </div>
      {rows.length === 0 ? (
        <p className="mt-3 text-[12.5px] text-muted">
          No submissions yet. Be the first.
        </p>
      ) : (
        <ul className="mt-3 flex flex-col gap-1">
          {rows.slice(0, 10).map((r) => {
            // Match by uid prefix (real backend) or by the mock's "you"
            // sentinel name (demo mode).
            const isYou =
              r.uid_name === "you" ||
              r.uid_name.includes(yourUid.slice(0, 6));
            return (
              <li
                key={`${r.rank}-${r.uid_name}`}
                className={cn(
                  "flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[12.5px]",
                  isYou ? "bg-surface-inverse text-surface-inverse-fg" : "bg-bg",
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid h-6 w-6 place-items-center rounded-full text-[11px] font-medium tabular-nums",
                      isYou
                        ? "bg-surface text-ink"
                        : "bg-surface ring-1 ring-hairline text-muted-strong",
                    )}
                  >
                    {r.rank}
                  </span>
                  <span className="font-medium">{r.uid_name}</span>
                </div>
                <span className="tabular-nums opacity-80">
                  {r.total_testcases_passed}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function ResultsList({
  state,
  results,
}: {
  state: OutputState;
  results: TestResult[] | null;
}) {
  if (state === "IDLE") {
    return (
      <p className="p-4 text-[12.5px] text-muted">
        Submit to run against every testcase.
      </p>
    );
  }
  if (state === "LOADING") {
    return (
      <p className="flex items-center gap-2 p-4 text-[12.5px] text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-muted animate-pulse" />
        Judging your submission…
      </p>
    );
  }
  if (!results || results.length === 0) {
    return (
      <p className="p-4 text-[12.5px] text-muted">No results yet.</p>
    );
  }
  const passed = results.filter((r) => r.passed).length;
  return (
    <div className="flex flex-col gap-2 p-1">
      <div className="px-2 text-[12px] text-muted">
        <span className="font-medium text-ink">{passed}</span> of{" "}
        {results.length} testcases passed
      </div>
      <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {results.map((r, i) => (
          <li
            key={i}
            className={cn(
              "flex items-center gap-2 rounded-lg p-2.5 text-[12px]",
              r.passed
                ? "bg-surface ring-1 ring-hairline"
                : "bg-surface-inverse text-surface-inverse-fg",
            )}
          >
            <span
              className={cn(
                "grid h-5 w-5 shrink-0 place-items-center rounded-full",
                r.passed
                  ? "bg-surface-inverse text-surface-inverse-fg"
                  : "bg-surface text-ink",
              )}
            >
              {r.passed ? (
                <Check className="h-3 w-3" />
              ) : (
                <X className="h-3 w-3" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <div className="font-medium">Case {r.t_id ?? i + 1}</div>
              <div className="text-[10.5px] opacity-70">
                {r.data.exec_time != null ? `${r.data.exec_time} ms` : "—"}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PlaySkeleton() {
  return (
    <div className="mx-auto flex   animate-pulse flex-col gap-4">
      <div className="h-6 w-40 rounded bg-surface-alt" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="h-[520px] rounded-2xl bg-surface-alt lg:col-span-4" />
        <div className="h-[520px] rounded-2xl bg-surface-alt lg:col-span-8" />
      </div>
    </div>
  );
}
