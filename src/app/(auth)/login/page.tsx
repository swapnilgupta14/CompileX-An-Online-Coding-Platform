import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Wordmark } from "@/components/ui/wordmark";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LoginForm } from "./LoginForm";
import { getSession } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "Sign in — CompileX",
  description: "Sign in to your CompileX workspace.",
};

interface Props {
  searchParams: Promise<{ next?: string; error?: string }>;
}

export default async function LoginPage({ searchParams }: Props) {
  const { next, error } = await searchParams;
  const session = await getSession().catch(() => null);
  if (session) redirect(next && next.startsWith("/") ? next : "/app");

  return (
    <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-bg px-6 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-lines opacity-40"
      />

      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-[380px]">
        <div className="mb-10 flex flex-col items-start gap-6">
          <Link
            href="/"
            className="inline-block transition-opacity hover:opacity-80"
          >
            <Wordmark />
          </Link>
          <div className="flex flex-col gap-1.5">
            <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.03em] text-ink">
              Welcome back.
            </h1>
            <p className="text-[14px] text-muted">
              Sign in with your workspace credentials.
            </p>
          </div>
        </div>

        <LoginForm next={next} presetError={error} />

        <p className="mt-8 text-[12.5px] leading-relaxed text-muted">
          By continuing you agree to our{" "}
          <Link
            href="#"
            className="text-ink underline underline-offset-4 decoration-hairline-strong hover:decoration-ink"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="text-ink underline underline-offset-4 decoration-hairline-strong hover:decoration-ink"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
