import { ArrowUpRight, Sparkles, Timer, Trophy } from "lucide-react";
import { getSession } from "@/lib/auth/server";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { StatCard } from "@/components/dashboard/StatCard";
import { DashboardChart } from "@/components/dashboard/DashboardChart";
import { ActivityList } from "@/components/dashboard/ActivityList";

export default async function DashboardPage() {
  const session = await getSession();
  const name = session?.sub.split("@")[0] ?? "there";

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <header className="flex flex-col gap-1.5">
        <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </div>
        <h1 className="text-[32px] font-semibold leading-tight tracking-[-0.03em] sm:text-[40px]">
          Good to see you, {name}.
        </h1>
        <p className="max-w-lg text-[15px] text-muted">
          Warm up in the Playground, sharpen in the Arena, then throw down
          in a Battleground. Season 3 is still open.
        </p>
      </header>

      <QuickActions />

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard
          label="Problems solved"
          value="128"
          delta="+12 this week"
          icon={<Sparkles className="h-4 w-4" />}
        />
        <StatCard
          label="Median run time"
          value="42 ms"
          delta="-8 ms"
          icon={<Timer className="h-4 w-4" />}
        />
        <StatCard
          label="Global rank"
          value="#834"
          delta="↑ 22"
          icon={<Trophy className="h-4 w-4" />}
        />
      </section>

      <section className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <div className="rounded-2xl bg-surface p-5 ring-1 ring-hairline lg:col-span-2">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="text-[12px] font-medium text-muted">
                Submissions
              </div>
              <div className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">
                Last 14 days
              </div>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-muted hover:text-ink"
            >
              Open report <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <DashboardChart />
        </div>

        <div className="rounded-2xl bg-surface p-5 ring-1 ring-hairline">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="text-[12px] font-medium text-muted">
                Activity
              </div>
              <div className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">
                Today
              </div>
            </div>
          </div>
          <ActivityList />
        </div>
      </section>
    </div>
  );
}
