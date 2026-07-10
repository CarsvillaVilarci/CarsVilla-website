import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-white hover:bg-brand-hot shadow-[0_10px_40px_-12px_rgba(225,29,42,0.7)] hover:shadow-[0_16px_50px_-10px_rgba(255,47,62,0.8)] hover:-translate-y-0.5",
        light:
          "bg-paper text-ink hover:bg-white hover:-translate-y-0.5",
        outline:
          "border border-line bg-white/5 text-paper backdrop-blur hover:border-paper/40 hover:bg-white/10",
        ghost: "text-paper/80 hover:text-paper hover:bg-white/5",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-12 px-6 text-[15px]",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type Props = VariantProps<typeof button> & {
  href?: string;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ href, variant, size, className, children, ...rest }: Props) {
  const classes = cn(button({ variant, size }), className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
