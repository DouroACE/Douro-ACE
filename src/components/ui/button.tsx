import Link from "next/link";
import { clsx } from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  href?: string;
  children: ReactNode;
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-charcoal/10";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-charcoal text-linen hover:bg-graphite shadow-subtle px-6 py-3 focus:ring-charcoal/20",
  secondary:
    "bg-white/80 text-charcoal border border-graphite/10 hover:border-charcoal/30 px-6 py-3",
  ghost: "text-charcoal hover:text-graphite px-4 py-2"
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-base"
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  fullWidth,
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = clsx(
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
