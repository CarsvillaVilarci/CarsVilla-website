import { cn } from "@/lib/utils";

const base =
  "w-full rounded-2xl border border-line bg-ink-2 px-4 py-3.5 text-paper placeholder:text-muted/60 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/30";

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-2 block text-sm font-medium text-paper/80">{children}</span>
  );
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(base, className)} {...props} />;
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(base, "appearance-none pr-10", className)} {...props}>
      {children}
    </select>
  );
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(base, "min-h-32 resize-y", className)} {...props} />;
}
