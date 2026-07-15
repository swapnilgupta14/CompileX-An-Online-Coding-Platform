"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { battleApi } from "@/lib/api/battle";
import { Button } from "@/components/ui/button";

interface Props {
  roomId: string;
}

export function JoinRoomClient({ roomId }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError("Enter a display name to join.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await battleApi.getUserId({ name: name.trim(), room_id: roomId });
      const uid = res.responseData?.user_id;
      if (!uid) {
        setError("Couldn't join the room. Try a different name.");
        setSubmitting(false);
        return;
      }
      router.push(`/app/battlegrounds/${roomId}/play/${uid}`);
    } catch {
      setError("The battleground service didn't respond. Try again in a moment.");
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6">
      <Link
        href="/app/battlegrounds"
        className="inline-flex items-center gap-1 text-[12px] font-medium text-muted hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All rooms
      </Link>
      <div className="rounded-2xl bg-surface p-8 ring-1 ring-hairline">
        <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
          Room · {roomId}
        </div>
        <h1 className="mt-2 text-[24px] font-semibold leading-tight tracking-[-0.03em]">
          Pick a display name
        </h1>
        <p className="mt-1 text-[13px] text-muted">
          This is how you&apos;ll appear on the leaderboard. Anonymous is fine
          — no email, no real name required.
        </p>
        <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="name"
              className="text-[12.5px] font-medium text-ink"
            >
              Display name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              maxLength={24}
              placeholder="e.g. sanat_km"
              className="h-11 rounded-xl bg-surface px-3.5 text-[14px] text-ink shadow-[inset_0_0_0_1px_var(--hairline)] outline-none placeholder:text-muted focus:shadow-[inset_0_0_0_1.5px_var(--ink)]"
            />
          </div>
          {error ? (
            <p className="text-[12.5px] text-[color:var(--danger)]">{error}</p>
          ) : null}
          <Button
            type="submit"
            size="lg"
            loading={submitting}
            iconRight={
              !submitting ? <ArrowRight className="h-4 w-4" /> : undefined
            }
          >
            Join room
          </Button>
        </form>
      </div>
    </div>
  );
}
