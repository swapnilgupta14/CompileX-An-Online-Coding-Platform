import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/ui/wordmark";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-bg">
      <Container className="py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Wordmark />
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-muted text-pretty">
              A calm, capable coding platform for people who care about how
              their work looks and feels. Made in Kanpur & San Francisco.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-4">
            {Object.entries(siteConfig.footer).map(([group, items]) => (
              <div key={group}>
                <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                  {group}
                </div>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="group inline-flex items-center text-[13.5px] text-muted-strong transition-colors hover:text-ink"
                      >
                        <span className="relative">
                          {item.label}
                          <span
                            aria-hidden
                            className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-300 group-hover:scale-x-100"
                          />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-hairline pt-8 md:flex-row md:items-center">
          <p className="text-[12px] text-muted">
            © {new Date().getFullYear()} CompileX. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[12px] text-muted">
            <Link href="#" className="hover:text-ink">
              Terms
            </Link>
            <span aria-hidden className="h-3 w-px bg-hairline-strong" />
            <Link href="#" className="hover:text-ink">
              Privacy
            </Link>
            <span aria-hidden className="h-3 w-px bg-hairline-strong" />
            <Link href="#" className="hover:text-ink">
              Security
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
