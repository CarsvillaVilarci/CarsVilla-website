"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, Phone, ShieldCheck, User } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

type Mode = "login" | "signup";
type Step = "details" | "otp" | "done";

export function LoginForm() {
  const [mode, setMode] = useState<Mode>("login");
  const [step, setStep] = useState<Step>("details");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const phoneValid = phone.replace(/\D/g, "").length >= 10;
  const detailsValid = mode === "signup" ? name.trim().length > 1 && phoneValid : phoneValid;
  const otpValid = otp.join("").length === 6;

  // resend countdown while on the OTP step
  useEffect(() => {
    if (step !== "otp" || resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [step, resendIn]);

  const switchMode = (m: Mode) => {
    setMode(m);
    setStep("details");
    setOtp(Array(6).fill(""));
  };

  const sendOtp = () => {
    if (!detailsValid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
      setResendIn(30);
      setOtp(Array(6).fill(""));
      setTimeout(() => inputs.current[0]?.focus(), 50);
    }, 700);
  };

  const verify = () => {
    if (!otpValid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("done");
    }, 700);
  };

  const setDigit = (i: number, val: string) => {
    const d = val.replace(/\D/g, "").slice(-1);
    setOtp((prev) => {
      const next = [...prev];
      next[i] = d;
      return next;
    });
    if (d && i < 5) inputs.current[i + 1]?.focus();
  };

  const onKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) inputs.current[i - 1]?.focus();
  };

  const onPaste = (e: React.ClipboardEvent) => {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    if (!digits.length) return;
    e.preventDefault();
    setOtp(Array.from({ length: 6 }, (_, i) => digits[i] ?? ""));
    inputs.current[Math.min(digits.length, 5)]?.focus();
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 flex justify-center lg:hidden">
        <Logo />
      </div>

      <div className="rounded-[var(--radius-2xl)] border border-line bg-paper p-8 shadow-luxe md:p-10">
        {/* Mode toggle */}
        {step === "details" && (
          <div className="mb-7 grid grid-cols-2 gap-1 rounded-full border border-line bg-cream/60 p-1">
            {(["login", "signup"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className={`rounded-full py-2 text-sm font-semibold transition-colors ${
                  mode === m ? "bg-wine text-cream" : "text-ink hover:text-wine"
                }`}
              >
                {m === "login" ? "Log in" : "Sign up"}
              </button>
            ))}
          </div>
        )}

        {step === "details" && (
          <form onSubmit={(e) => { e.preventDefault(); sendOtp(); }}>
            <h1 className="font-display text-3xl text-ink">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-2 text-sm text-muted">
              {mode === "login"
                ? "Sign in with your phone to save cars, track enquiries and manage listings."
                : "Join CarsVilla to shortlist cars, sell yours and track every enquiry."}
            </p>

            {mode === "signup" && (
              <label className="mt-7 block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Full name</span>
                <span className="flex items-center gap-2 rounded-xl border border-line bg-cream/50 px-4 focus-within:border-wine/40 focus-within:bg-paper">
                  <User size={16} className="text-muted" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Aarav Sharma"
                    className="h-12 w-full bg-transparent text-sm text-ink placeholder:text-muted outline-none"
                  />
                </span>
              </label>
            )}

            <label className={`block ${mode === "signup" ? "mt-4" : "mt-7"}`}>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Mobile number</span>
              <span className="flex items-center gap-2 rounded-xl border border-line bg-cream/50 px-4 focus-within:border-wine/40 focus-within:bg-paper">
                <Phone size={16} className="text-muted" />
                <span className="text-sm text-ink">+91</span>
                <input
                  autoFocus={mode === "login"}
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="90000 00000"
                  className="h-12 w-full bg-transparent text-sm text-ink placeholder:text-muted outline-none"
                />
              </span>
            </label>

            <button
              type="submit"
              disabled={!detailsValid || loading}
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-wine px-6 py-3.5 text-sm font-semibold text-cream transition-all hover:bg-wine-hot hover:shadow-luxe disabled:opacity-40"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              {loading ? "Sending OTP…" : "Send OTP"}
              {!loading && <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={(e) => { e.preventDefault(); verify(); }}>
            <button type="button" onClick={() => setStep("details")} className="text-sm font-medium text-muted hover:text-wine">
              ← Change number
            </button>
            <h1 className="mt-4 font-display text-3xl text-ink">Enter the code</h1>
            <p className="mt-2 text-sm text-muted">
              We sent a 6-digit code to <span className="font-semibold text-ink">+91 {phone}</span>.
            </p>

            <div className="mt-7 flex justify-between gap-2" onPaste={onPaste}>
              {otp.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => { inputs.current[i] = el; }}
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={(e) => setDigit(i, e.target.value)}
                  onKeyDown={(e) => onKey(i, e)}
                  className="h-14 w-full rounded-xl border border-line bg-cream/50 text-center font-display text-2xl text-ink outline-none focus:border-wine/40 focus:bg-paper"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={!otpValid || loading}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-wine px-6 py-3.5 text-sm font-semibold text-cream transition-all hover:bg-wine-hot disabled:opacity-40"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Verifying…" : mode === "login" ? "Verify & log in" : "Verify & create account"}
            </button>
            <p className="mt-4 text-center text-xs text-muted">
              Didn&apos;t get it?{" "}
              {resendIn > 0 ? (
                <span>Resend in {resendIn}s</span>
              ) : (
                <button type="button" onClick={() => { setResendIn(30); setOtp(Array(6).fill("")); }} className="font-semibold text-wine">
                  Resend code
                </button>
              )}
            </p>
          </form>
        )}

        {step === "done" && (
          <div className="py-6 text-center">
            <ShieldCheck size={44} className="mx-auto text-emerald-600" strokeWidth={1.5} />
            <h1 className="mt-4 font-display text-2xl text-ink">
              {mode === "login" ? "You're signed in" : `Welcome, ${name.split(" ")[0] || "there"}!`}
            </h1>
            <p className="mx-auto mt-2 max-w-xs text-sm text-muted">
              Accounts &amp; profiles go live with the backend (Phase 3). For now this is a preview of the {mode} flow.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-wine hover:border-wine/40"
            >
              Back to home
            </Link>
          </div>
        )}
      </div>

      {/* footer toggle */}
      {step === "details" && (
        <p className="mt-6 text-center text-sm text-muted">
          {mode === "login" ? "New to CarsVilla? " : "Already have an account? "}
          <button
            onClick={() => switchMode(mode === "login" ? "signup" : "login")}
            className="font-semibold text-wine hover:underline"
          >
            {mode === "login" ? "Create an account" : "Log in"}
          </button>
        </p>
      )}
      <p className="mt-3 text-center text-xs text-muted">
        By continuing you agree to CarsVilla&apos;s Terms &amp; Privacy Policy.
      </p>
    </div>
  );
}
