"use client";

import Link from "next/link";
import { motion, type HTMLMotionProps } from "motion/react";
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 font-medium " +
  "select-none whitespace-nowrap transition-colors duration-200 " +
  "disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg " +
  "focus-visible:ring-focus";

const variants: Record<Variant, string> = {
  primary:
    "bg-surface-inverse text-surface-inverse-fg shadow-[0_1px_2px_rgb(0_0_0/0.16),0_-1px_0_rgb(255_255_255/0.08)_inset] hover:opacity-90",
  secondary:
    "bg-surface text-ink shadow-[inset_0_0_0_1px_var(--hairline)] hover:shadow-[inset_0_0_0_1px_var(--hairline-strong)]",
  ghost:
    "bg-transparent text-muted-strong hover:text-ink hover:bg-surface-alt",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px] rounded-full",
  md: "h-10 px-5 text-sm rounded-full",
  lg: "h-12 px-7 text-[15px] rounded-full",
};

export function buttonClass(opts?: {
  variant?: Variant;
  size?: Size;
  className?: string;
}): string {
  const { variant = "primary", size = "md", className } = opts ?? {};
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    children,
    variant = "primary",
    size = "md",
    loading = false,
    icon,
    iconRight,
    disabled,
    ...rest
  },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.97, y: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={buttonClass({ variant, size, className })}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <span
          aria-hidden
          className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin"
        />
      ) : (
        icon
      )}
      {children ? <span>{children}</span> : null}
      {!loading && iconRight}
    </motion.button>
  );
});

interface ButtonLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconRight?: ReactNode;
  children?: ReactNode;
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  function ButtonLink(
    {
      className,
      children,
      variant = "primary",
      size = "md",
      icon,
      iconRight,
      href,
      ...rest
    },
    ref,
  ) {
    return (
      <Link
        ref={ref}
        href={href}
        className={buttonClass({ variant, size, className })}
        {...rest}
      >
        {icon}
        {children ? <span>{children}</span> : null}
        {iconRight}
      </Link>
    );
  },
);
