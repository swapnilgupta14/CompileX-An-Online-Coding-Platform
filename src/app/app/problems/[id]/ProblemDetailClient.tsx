"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, Check, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { problemsApi } from "@/lib/api/problems";
import { toDifficulty } from "@/lib/problems/difficulty";
import { STARTERS, type Lang } from "@/lib/problems/starters";
import { useWebSocket } from "@/hooks/use-websocket";
import { DifficultyBadge } from "@/components/dashboard/DifficultyBadge";
import { CodeEditor, type EditorTheme } from "@/components/coding/CodeEditor";
import { EditorToolbar } from "@/components/coding/EditorToolbar";
import { OutputPanel, type OutputState } from "@/components/coding/OutputPanel";
import { cn } from "@/lib/cn";
import type {
  ArenaCodeReq,
  ArenaCodeRes,
  PlaygroundCodeReq,
  PlaygroundCodeRes,
  TestResult,
  Testcase,
} from "@/lib/api/types";

type OutputTab = "results" | "custom";

interface Props {
  problemId: string;
}

export function ProblemDetailClient({ problemId }: Props) {
  const [language, setLanguage] = useState<Lang>("cpp");
  const [theme, setTheme] = useState<EditorTheme>("auto");
  const [fontSize, setFontSize] = useState(15);
  const [code, setCode] = useState<string>(STARTERS.cpp);
  const [tab, setTab] = useState<OutputTab>("results");
  const [customInput, setCustomInput] = useState("");

  const [results, setResults] = useState<TestResult[] | null>(null);
  const [resultsState, setResultsState] = useState<OutputState>("IDLE");

  const [customOutput, setCustomOutput] = useState("");
  const [customState, setCustomState] = useState<OutputState>("IDLE");
  const [customExec, setCustomExec] = useState<number | null>(null);

  const problem = useQuery({
    queryKey: ["problem", problemId],
    queryFn: () => problemsApi.get(problemId).then((r) => r.responseData),
    enabled: Boolean(problemId),
  });

  const testcases = useQuery({
    queryKey: ["problem-testcases", problemId],
    queryFn: () =>
      problemsApi
        .testcases(problemId)
        .then((r) => r.responseData ?? [])
        .catch(() => [] as Testcase[]),
    enabled: Boolean(problemId),
  });

  const arenaSocket = useWebSocket<ArenaCodeReq, ArenaCodeRes>(
    "/arena/code_execute",
    {
      onMessage: (msg) => {
        setResults(msg.responseData);
        setResultsState("SUCCESS");
      },
    },
  );

  const pgSocket = useWebSocket<PlaygroundCodeReq, PlaygroundCodeRes>(
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
        } else {
          setCustomOutput("Unknown response");
          setCustomState("ERROR");
        }
      },
    },
  );

  const onLanguage = (next: Lang) => {
    setLanguage(next);
    setCode(STARTERS[next]);
  };

  const onRun = () => {
    if (tab === "custom") {
      setCustomState("LOADING");
      setCustomOutput("");
      setCustomExec(null);
      pgSocket.send({ code, input: customInput });
    } else {
      setResultsState("LOADING");
      setResults(null);
      arenaSocket.send({ code, p_id: problemId });
    }
  };

  if (problem.isLoading) {
    return <DetailSkeleton />;
  }
  if (problem.isError || !problem.data) {
    return (
      <div className="mx-auto max-w-3xl rounded-2xl bg-surface p-8 ring-1 ring-hairline">
        <div className="text-[15px] font-medium">Couldn&apos;t load problem.</div>
        <p className="mt-1 text-[13px] text-muted">
          The problem might not exist or the Arena service is unreachable.
        </p>
        <Link
          href="/app/problems"
          className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to problems
        </Link>
      </div>
    );
  }

  const p = problem.data;
  const difficulty = toDifficulty(p.p_difficulty);

  return (
    <div className="mx-auto flex   flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Link
            href="/app/problems"
            className="inline-flex items-center gap-1 text-[12px] font-medium text-muted hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Arena
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-[26px] font-semibold leading-tight tracking-[-0.03em] sm:text-[30px]">
              {p.p_title}
            </h1>
            <DifficultyBadge value={difficulty} />
          </div>
          <div className="text-[12px] text-muted">
            By {p.p_author} · {new Date(p.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="flex flex-col gap-3 lg:col-span-5">
          <div className="rounded-2xl bg-surface p-5 ring-1 ring-hairline">
            <div className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted">
              Problem
            </div>
            <div className="prose prose-sm mt-2 max-w-none text-[14px] leading-relaxed text-ink">
              <ReactMarkdown>{p.p_content}</ReactMarkdown>
            </div>
          </div>

          <div className="rounded-2xl bg-surface p-5 ring-1 ring-hairline">
            <div className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted">
              Public testcases
            </div>
            {testcases.data && testcases.data.length > 0 ? (
              <ul className="mt-3 flex flex-col gap-2">
                {testcases.data.map((t, i) => (
                  <li
                    key={i}
                    className="rounded-lg bg-bg p-3 text-[12.5px]"
                  >
                    <div className="text-muted">Input</div>
                    <pre className="mt-1 whitespace-pre-wrap font-mono text-ink">
                      {t.input_case || "—"}
                    </pre>
                    <div className="mt-2 text-muted">Expected output</div>
                    <pre className="mt-1 whitespace-pre-wrap font-mono text-ink">
                      {t.output_case || "—"}
                    </pre>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-[12.5px] text-muted">
                No public testcases available.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:col-span-7">
          <EditorToolbar
            language={language}
            onLanguage={onLanguage}
            theme={theme}
            onTheme={setTheme}
            fontSize={fontSize}
            onFontSize={setFontSize}
            onRun={onRun}
            running={
              tab === "custom"
                ? customState === "LOADING"
                : resultsState === "LOADING"
            }
            runLabel={tab === "custom" ? "Run" : "Submit"}
          />

          <div className="h-[460px]">
            <CodeEditor
              value={code}
              language={language}
              theme={theme}
              fontSize={fontSize}
              onChange={setCode}
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
              <TestResults state={resultsState} results={results} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TestResults({
  state,
  results,
}: {
  state: OutputState;
  results: TestResult[] | null;
}) {
  if (state === "IDLE") {
    return (
      <p className="p-4 text-[12.5px] text-muted">
        Submit to run your code against every testcase.
      </p>
    );
  }
  if (state === "LOADING") {
    return (
      <p className="flex items-center gap-2 p-4 text-[12.5px] text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-muted animate-pulse" />
        Running against all testcases…
      </p>
    );
  }
  if (!results || results.length === 0) {
    return (
      <p className="p-4 text-[12.5px] text-muted">
        No results returned.
      </p>
    );
  }
  const passed = results.filter((r) => r.passed).length;
  return (
    <div className="flex flex-col gap-2 p-1">
      <div className="flex items-center justify-between px-2 text-[12px] text-muted">
        <span>
          <span className="font-medium text-ink">{passed}</span> of{" "}
          {results.length} testcases passed
        </span>
      </div>
      <ul className="flex flex-col gap-1.5">
        {results.map((r, i) => (
          <li
            key={i}
            className={cn(
              "flex items-start gap-3 rounded-lg p-3 text-[12.5px]",
              r.passed
                ? "bg-surface ring-1 ring-hairline"
                : "bg-surface-inverse text-surface-inverse-fg",
            )}
          >
            <span
              className={cn(
                "grid h-6 w-6 shrink-0 place-items-center rounded-full",
                r.passed
                  ? "bg-surface-inverse text-surface-inverse-fg"
                  : "bg-surface text-ink",
              )}
            >
              {r.passed ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <X className="h-3.5 w-3.5" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">Case {r.t_id ?? i + 1}</span>
                <span className="opacity-70">
                  {r.data.exec_time != null ? `${r.data.exec_time} ms` : "—"}
                </span>
              </div>
              {r.expected_out || r.user_input ? (
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {r.user_input ? (
                    <div>
                      <div className="text-[10.5px] opacity-70">Input</div>
                      <pre className="mt-0.5 whitespace-pre-wrap font-mono text-[11.5px]">
                        {r.user_input}
                      </pre>
                    </div>
                  ) : null}
                  {r.expected_out ? (
                    <div>
                      <div className="text-[10.5px] opacity-70">Expected</div>
                      <pre className="mt-0.5 whitespace-pre-wrap font-mono text-[11.5px]">
                        {r.expected_out}
                      </pre>
                    </div>
                  ) : null}
                </div>
              ) : null}
              {r.data.output ? (
                <div className="mt-2">
                  <div className="text-[10.5px] opacity-70">Your output</div>
                  <pre className="mt-0.5 whitespace-pre-wrap font-mono text-[11.5px]">
                    {r.data.output}
                  </pre>
                </div>
              ) : null}
              {r.data.error ? (
                <div className="mt-2">
                  <div className="text-[10.5px] opacity-70">Error</div>
                  <pre className="mt-0.5 whitespace-pre-wrap font-mono text-[11.5px]">
                    {r.data.error}
                  </pre>
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="mx-auto flex   animate-pulse flex-col gap-4">
      <div className="h-6 w-40 rounded bg-surface-alt" />
      <div className="h-8 w-1/2 rounded bg-surface-alt" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="h-[520px] rounded-2xl bg-surface-alt lg:col-span-5" />
        <div className="h-[520px] rounded-2xl bg-surface-alt lg:col-span-7" />
      </div>
    </div>
  );
}
