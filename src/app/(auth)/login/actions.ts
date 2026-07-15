"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSession, verifyCredentials } from "@/lib/auth/server";

const LoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
  next: z.string().optional(),
});

export interface LoginState {
  ok: boolean;
  error?: string;
  fieldErrors?: Partial<Record<"email" | "password", string>>;
}

export async function loginAction(
  _prev: LoginState,
  form: FormData,
): Promise<LoginState> {
  const parsed = LoginSchema.safeParse({
    email: form.get("email"),
    password: form.get("password"),
    next: form.get("next"),
  });

  if (!parsed.success) {
    const fieldErrors: LoginState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "email" || key === "password") {
        fieldErrors[key] = issue.message;
      }
    }
    return { ok: false, error: "Please check the form.", fieldErrors };
  }

  const { email, password, next } = parsed.data;
  const ok = await verifyCredentials(email, password);
  if (!ok) {
    // Deliberately vague to avoid revealing whether the email exists.
    return { ok: false, error: "Incorrect email or password." };
  }

  await createSession(email);

  const target =
    next && next.startsWith("/") && !next.startsWith("//") ? next : "/app";
  redirect(target);
  // Unreachable — helps TypeScript when next/navigation types aren't loaded.
  return { ok: true };
}
