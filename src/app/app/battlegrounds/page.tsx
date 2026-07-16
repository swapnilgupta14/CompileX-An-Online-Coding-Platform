import Link from "next/link";
import { ArrowRight, Timer } from "lucide-react";
import { MOCK_ROOMS, type MockRoom } from "@/lib/api/mock";

/**
 * Battleground list. The current backend doesn't expose a list endpoint;
 * we render the shared mock room set. Same room ids feed the join gate
 * and the play screen, so the whole flow is clickable end-to-end.
 */
const rooms = MOCK_ROOMS;

const STATUS_LABEL: Record<MockRoom["status"], string> = {
  ongoing: "Live",
  upcoming: "Starts soon",
  completed: "Finished",
};

export const metadata = { title: "Battlegrounds" };

export default function BattlegroundsPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <header className="flex flex-col gap-1.5">
        <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
          Battlegrounds
        </div>
        <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.03em] sm:text-[32px]">
          Rooms
        </h1>
        <p className="max-w-lg text-[14px] text-muted">
          Live rooms with a shared clock and a live leaderboard. Join one,
          pick a name, start shipping.
        </p>
      </header>

      <ul className="flex flex-col gap-3">
        {rooms.map((r) => (
          <li key={r.room_id}>
            <Link
              href={`/app/battlegrounds/${r.room_id}`}
              className="group flex items-center justify-between gap-4 rounded-2xl bg-surface p-5 ring-1 ring-hairline transition-shadow hover:shadow-[0_18px_36px_-16px_rgb(0_0_0/0.10)]"
            >
              <div className="flex items-center gap-4">
                <span
                  className={
                    r.status === "ongoing"
                      ? "grid h-10 w-10 place-items-center rounded-xl bg-surface-inverse text-surface-inverse-fg"
                      : "grid h-10 w-10 place-items-center rounded-xl bg-surface ring-1 ring-hairline text-ink"
                  }
                >
                  <Timer className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-[15px] font-semibold tracking-[-0.015em]">
                    {r.name}
                  </div>
                  <div className="mt-0.5 text-[12px] text-muted">
                    {STATUS_LABEL[r.status]}
                    {r.status === "ongoing" && ` · ${r.minutesLeft} min left`}
                    {r.status === "upcoming" && ` · ${r.startsIn}`}
                    {r.status === "completed" && ` · ${r.endedAt}`}
                    {" · "}
                    {r.problems} problems · {r.players} players
                  </div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
