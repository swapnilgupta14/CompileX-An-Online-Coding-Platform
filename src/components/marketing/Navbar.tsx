"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useScrolled } from "@/hooks/use-scroll";
import { siteConfig } from "@/lib/site";
import { Wordmark } from "@/components/ui/wordmark";
import { ButtonLink } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Navbar() {
  const scrolled = useScrolled(8);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          paddingTop: scrolled ? 8 : 16,
          paddingBottom: scrolled ? 8 : 16,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled
            ? "bg-bg/70 backdrop-blur-xl backdrop-saturate-150"
            : "bg-transparent",
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-px transition-opacity duration-300",
            scrolled ? "opacity-100" : "opacity-0",
          )}
          style={{ background: "var(--hairline)" }}
        />

        <nav
          aria-label="Primary"
          className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10"
        >
          <Link
            href="/"
            className="flex items-center transition-opacity hover:opacity-80"
          >
            <Wordmark />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <ButtonLink href="/login" variant="ghost" size="sm">
              Sign in
            </ButtonLink>
            <ButtonLink href="/login" size="sm">
              Start free
            </ButtonLink>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-surface-alt md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? <MobileDrawer onClose={() => setOpen(false)} /> : null}
      </AnimatePresence>
    </>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative inline-flex h-9 items-center rounded-full px-3 text-[13.5px] font-medium text-muted-strong transition-colors hover:text-ink"
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-300 ease-out group-hover:scale-x-100"
        />
      </span>
    </Link>
  );
}

function MobileDrawer({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-40 md:hidden"
    >
      <motion.div
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-ink/10 backdrop-blur-sm"
      />
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="absolute inset-x-4 top-20 rounded-2xl bg-surface p-3 shadow-[var(--shadow-pop)] ring-1 ring-hairline"
      >
        <ul className="flex flex-col">
          {siteConfig.nav.map((item, i) => (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.04 }}
            >
              <Link
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium text-ink hover:bg-surface-alt"
              >
                {item.label}
                <span aria-hidden className="text-muted">
                  →
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
        <div className="mt-3 flex items-center justify-between border-t border-hairline pt-3">
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            Theme
          </span>
          <ThemeToggle />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-hairline pt-3">
          <ButtonLink
            href="/login"
            variant="secondary"
            size="md"
            onClick={onClose}
          >
            Sign in
          </ButtonLink>
          <ButtonLink href="/login" size="md" onClick={onClose}>
            Start free
          </ButtonLink>
        </div>
      </motion.div>
    </motion.div>
  );
}
