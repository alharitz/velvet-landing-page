import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "on-dark-primary" | "on-dark-secondary" | "text";
}

const variantStyles = {
  primary: "px-8 py-4 uppercase tracking-widest text-xs font-semibold bg-ink text-background hover:bg-accent transition-all duration-300",
  secondary: "px-8 py-4 uppercase tracking-widest text-xs font-semibold border border-ink text-ink hover:bg-ink hover:text-background transition-all duration-300",
  "on-dark-primary": "px-8 py-4 uppercase tracking-widest text-xs font-semibold bg-background text-ink hover:bg-accent transition-all duration-300",
  "on-dark-secondary": "px-8 py-4 uppercase tracking-widest text-xs font-semibold border border-background text-background hover:bg-background hover:text-ink transition-all duration-300",
  text: "px-0 py-0 text-base font-normal border-b-2 border-transparent hover:border-accent text-ink hover:text-accent transition-colors duration-300",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 font-sans",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
);

Button.displayName = "Button";

export { Button };
