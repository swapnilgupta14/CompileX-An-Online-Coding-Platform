"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Braces,
  LayoutGrid,
  Settings,
  ShieldCheck,
  Swords,
  User,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Wordmark } from "@/components/ui/wordmark";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { logoutAction } from "@/app/logout/actions";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  match: (path: string) => boolean;
}

const nav: NavItem[] = [
  {
    label: "Dashboard",
    href: "/app",
    icon: LayoutGrid,
    match: (p) => p === "/app",
  },
  {
    label: "Playground",
    href: "/app/playground",
    icon: Braces,
    match: (p) => p.startsWith("/app/playground"),
  },
  {
    label: "Arena",
    href: "/app/problems",
    icon: LayoutGrid,
    match: (p) => p.startsWith("/app/problems"),
  },
  {
    label: "Battleground",
    href: "/app/battlegrounds",
    icon: Swords,
    match: (p) => p.startsWith("/app/battlegrounds"),
  },
  {
    label: "Admin",
    href: "/app/admin/problems",
    icon: ShieldCheck,
    match: (p) => p.startsWith("/app/admin"),
  },
];

interface Props {
  userEmail: string;
}

export function Sidebar({ userEmail }: Props) {
  const pathname = usePathname() ?? "/app";
  const username = userEmail.split("@")[0] ?? "user";

  return (
    <aside className="sticky top-0 hidden h-svh w-[240px] shrink-0 flex-col border-r border-hairline bg-bg p-4 md:flex">
      <Link href="/" className="mb-6 inline-flex px-1.5">
        <Wordmark />
      </Link>

      <nav aria-label="Workspace">
        <ul className="flex flex-col gap-0.5">
          {nav.map((item) => {
            const active = item.match(pathname);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13.5px] font-medium transition-colors",
                    active
                      ? "bg-surface text-ink ring-1 ring-hairline"
                      : "text-muted-strong hover:bg-surface hover:text-ink",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto flex flex-col gap-1">
        <div className="mb-2 flex items-center justify-between rounded-lg px-2.5 py-1.5">
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            Theme
          </span>
          <ThemeToggle />
        </div>
        <Link
          href={`/app/profile/${username}`}
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13.5px] font-medium text-muted-strong hover:bg-surface hover:text-ink"
        >
          <User className="h-4 w-4" />
          Profile
        </Link>
        <Link
          href="/app"
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13.5px] font-medium text-muted-strong hover:bg-surface hover:text-ink"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <div className="mt-3 flex items-center gap-2.5 rounded-xl bg-surface p-2.5 ring-1 ring-hairline">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-surface-inverse text-[12px] font-semibold text-surface-inverse-fg">
            {userEmail[0]?.toUpperCase() ?? "U"}
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[12.5px] font-medium text-ink">
              {userEmail}
            </div>
            <div className="text-[10.5px] text-muted">Signed in</div>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-full px-2 py-1 text-[10.5px] font-medium text-muted hover:bg-surface-alt hover:text-ink"
              title="Sign out"
            >
              Log out
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
