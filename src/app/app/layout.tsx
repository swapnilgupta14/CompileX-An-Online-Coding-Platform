import type { Metadata } from "next";
import { requireSession } from "@/lib/auth/server";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { QueryProvider } from "@/components/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Workspace",
};

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireSession();

  return (
    <QueryProvider>
      <div className="min-h-svh bg-bg">
        <div className="mx-auto flex min-h-svh  ">
          <Sidebar userEmail={session.sub} />
          <div className="flex min-w-0 flex-1 flex-col">
            <Topbar />
            <main className="flex-1 p-5 sm:p-8">{children}</main>
          </div>
        </div>
      </div>
    </QueryProvider>
  );
}
