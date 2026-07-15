"use client";

import { motion } from "motion/react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, ArrowRight, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = { ok: false };

interface Props {
  next?: string;
  presetError?: string;
}

const inputClass =
  "h-11 w-full rounded-xl bg-surface pl-10 pr-3.5 text-[14px] text-ink shadow-[inset_0_0_0_1px_var(--hairline)] outline-none transition-shadow placeholder:text-muted focus:shadow-[inset_0_0_0_1.5px_var(--ink)]";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="lg"
      className="w-full justify-center"
      loading={pending}
      iconRight={
        !pending ? <ArrowRight className="h-4 w-4" aria-hidden /> : undefined
      }
    >
      {pending ? "Signing in" : "Sign in"}
    </Button>
  );
}

export function LoginForm({ next, presetError }: Props) {
  const [state, formAction] = useActionState(loginAction, initialState);
  const error = state.error ?? presetError;

  return (
    <motion.form
      action={formAction}
      initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-5"
      noValidate
    >
      <input type="hidden" name="next" value={next ?? ""} />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-[13px] font-medium text-ink">
          Email
        </label>
        <div className="group relative">
          <Mail
            aria-hidden
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted transition-colors group-focus-within:text-ink"
          />
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@compilex.dev"
            className={inputClass}
            aria-invalid={Boolean(state.fieldErrors?.email)}
          />
        </div>
        {state.fieldErrors?.email ? (
          <p className="text-[12px]" style={{ color: "var(--danger)" }}>
            {state.fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-[13px] font-medium text-ink">
          Password
        </label>
        <div className="group relative">
          <Lock
            aria-hidden
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted transition-colors group-focus-within:text-ink"
          />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="Enter your password"
            className={inputClass}
            aria-invalid={Boolean(state.fieldErrors?.password)}
          />
        </div>
        {state.fieldErrors?.password ? (
          <p className="text-[12px]" style={{ color: "var(--danger)" }}>
            {state.fieldErrors.password}
          </p>
        ) : null}
      </div>

      {error ? (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2 rounded-xl px-3.5 py-2.5 text-[13px] ring-1"
          style={{
            background: "var(--danger-bg)",
            color: "var(--danger)",
            borderColor: "var(--danger-ring)",
          }}
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>
            {error === "unconfigured"
              ? "Auth is not configured. Set ADMIN_EMAIL, ADMIN_PASSWORD, and AUTH_SECRET in .env.local."
              : error}
          </span>
        </motion.div>
      ) : null}

      <SubmitButton />
    </motion.form>
  );
}
