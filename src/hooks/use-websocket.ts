"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { wsUrl } from "@/lib/api/ws";

type Status = "IDLE" | "CONNECTING" | "OPEN" | "CLOSED" | "ERROR";

interface Options<Res> {
  /** Called for every message. Return `false` to drop the message from state. */
  onMessage?: (msg: Res) => boolean | void;
}

/**
 * Generic typed WebSocket. Opens on first `send`, holds the connection open
 * until unmount. `messages` is the latest message received (single value —
 * the current app never needed a queue).
 *
 * Multi-event channels: pass a discriminated union as `Res` and switch on
 * the tag inside `onMessage`.
 */
export function useWebSocket<Req, Res>(path: string, options: Options<Res> = {}) {
  const socketRef = useRef<WebSocket | null>(null);
  const optsRef = useRef(options);
  optsRef.current = options;

  const [status, setStatus] = useState<Status>("IDLE");
  const [message, setMessage] = useState<Res | null>(null);

  const ensureOpen = useCallback(() => {
    if (socketRef.current && socketRef.current.readyState <= WebSocket.OPEN) {
      return socketRef.current;
    }
    setStatus("CONNECTING");
    const ws = new WebSocket(wsUrl(path));
    socketRef.current = ws;
    ws.onopen = () => setStatus("OPEN");
    ws.onclose = () => setStatus("CLOSED");
    ws.onerror = () => setStatus("ERROR");
    ws.onmessage = (event: MessageEvent<string>) => {
      try {
        const parsed = JSON.parse(event.data) as Res;
        const keep = optsRef.current.onMessage?.(parsed);
        if (keep !== false) setMessage(parsed);
      } catch {
        // Ignore malformed frames.
      }
    };
    return ws;
  }, [path]);

  const send = useCallback(
    (payload: Req) => {
      const ws = ensureOpen();
      const body = JSON.stringify(payload);
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(body);
      } else {
        // Buffer until open.
        const original = ws.onopen;
        ws.onopen = (ev) => {
          if (typeof original === "function") original.call(ws, ev);
          ws.send(body);
        };
      }
    },
    [ensureOpen],
  );

  const close = useCallback(() => {
    socketRef.current?.close();
    socketRef.current = null;
    setStatus("CLOSED");
  }, []);

  useEffect(() => {
    return () => {
      socketRef.current?.close();
      socketRef.current = null;
    };
  }, []);

  return { status, message, send, close };
}
