"use client";

import { useState } from "react";
import { CodeEditor, type EditorTheme } from "@/components/coding/CodeEditor";
import { EditorToolbar } from "@/components/coding/EditorToolbar";
import { OutputPanel, type OutputState } from "@/components/coding/OutputPanel";
import { STARTERS, type Lang } from "@/lib/problems/starters";
import { useWebSocket } from "@/hooks/use-websocket";
import type {
  PlaygroundCodeReq,
  PlaygroundCodeRes,
} from "@/lib/api/types";

/**
 * Playground page. WebSocket to /pg/code_execute; run code with custom
 * stdin, see stdout + exec time.
 */
export function PlaygroundClient() {
  const [language, setLanguage] = useState<Lang>("cpp");
  const [theme, setTheme] = useState<EditorTheme>("auto");
  const [fontSize, setFontSize] = useState(15);
  const [code, setCode] = useState<Record<Lang, string>>({
    cpp: STARTERS.cpp,
    python: STARTERS.python,
    javascript: STARTERS.javascript,
  });
  const [stdin, setStdin] = useState("");
  const [state, setState] = useState<OutputState>("IDLE");
  const [output, setOutput] = useState<string>("");
  const [execTime, setExecTime] = useState<number | null>(null);

  const { send } = useWebSocket<PlaygroundCodeReq, PlaygroundCodeRes>(
    "/pg/code_execute",
    {
      onMessage: (msg) => {
        const data = msg.responseData;
        if (data.error && "details" in data.data) {
          setOutput(data.data.message);
          setState("ERROR");
          setExecTime(null);
        } else if ("output" in data.data) {
          setOutput(data.data.output);
          setState("SUCCESS");
          setExecTime(data.data.exec_time);
        } else {
          setOutput("Unknown response");
          setState("ERROR");
          setExecTime(null);
        }
      },
    },
  );

  const onRun = () => {
    setState("LOADING");
    setOutput("");
    setExecTime(null);
    send({ code: code[language], input: stdin });
  };

  return (
    <div className="mx-auto flex   flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
          Playground
        </div>
        <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.03em]">
          Write. Run. Iterate.
        </h1>
      </div>

      <EditorToolbar
        language={language}
        onLanguage={setLanguage}
        theme={theme}
        onTheme={setTheme}
        fontSize={fontSize}
        onFontSize={setFontSize}
        onRun={onRun}
        running={state === "LOADING"}
      />

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="h-[520px]">
            <CodeEditor
              value={code[language]}
              language={language}
              theme={theme}
              fontSize={fontSize}
              onChange={(v) =>
                setCode((prev) => ({ ...prev, [language]: v }))
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 lg:col-span-4">
          <div className="rounded-xl bg-surface p-3 ring-1 ring-hairline">
            <label
              htmlFor="stdin"
              className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted"
            >
              Custom stdin
            </label>
            <textarea
              id="stdin"
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              rows={7}
              placeholder="Type input to pipe into your program"
              className="mt-2 w-full resize-none rounded-md bg-bg p-2.5 text-[12.5px] text-ink outline-none placeholder:text-muted ring-1 ring-hairline focus:ring-focus"
              spellCheck={false}
            />
          </div>
          <OutputPanel state={state} output={output} execTimeMs={execTime} />
        </div>
      </div>
    </div>
  );
}
