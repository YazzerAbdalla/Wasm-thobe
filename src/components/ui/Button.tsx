import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

/* ----------------------------------
  Types
---------------------------------- */
type ButtonVariant = "primary" | "outline" | "small";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

/* ----------------------------------
  Base + Variant Styles
---------------------------------- */
const baseStyles =
  "inline-flex items-center justify-center  font-semibold transition-all duration-200 ease-out focus:outline-none hover:scale-105";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-gold-gradient text-black px-20 py-4 text-2xl",

  outline:
    "border border-gray-400 text-white px-20 py-4 text-2xl hover:border-gold",

  small: "px-6 py-2 text-sm",
};

/* ----------------------------------
  Component
---------------------------------- */
export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
