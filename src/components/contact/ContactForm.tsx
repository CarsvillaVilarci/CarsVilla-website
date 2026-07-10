"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { Label, Input, Textarea, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid place-items-center rounded-[2rem] border border-line bg-surface p-12 text-center"
      >
        <div className="grid h-16 w-16 place-items-center rounded-full bg-brand/15 text-brand">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-6 font-display text-2xl text-paper">Message sent!</h3>
        <p className="mx-auto mt-3 max-w-sm text-muted">
          Thanks for reaching out. A CarsVilla advisor will get back to you within a few hours.
        </p>
        <p className="mt-5 text-xs text-muted">Demo form — no data was stored.</p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
      className="rounded-[2rem] border border-line bg-surface p-8 md:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div><Label>Full name</Label><Input required placeholder="Your name" /></div>
        <div><Label>Mobile number</Label><Input required type="tel" placeholder="10-digit mobile" /></div>
      </div>
      <div className="mt-5"><Label>Email</Label><Input type="email" placeholder="you@example.com" /></div>
      <div className="mt-5">
        <Label>I&apos;m interested in</Label>
        <Select defaultValue="">
          <option value="" disabled>Select a topic</option>
          <option>Selling my car</option>
          <option>Buying a car</option>
          <option>RC transfer / paperwork</option>
          <option>Insurance</option>
          <option>Financing / loan</option>
          <option>Something else</option>
        </Select>
      </div>
      <div className="mt-5"><Label>Message</Label><Textarea placeholder="Tell us how we can help…" /></div>
      <div className="mt-7">
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          Send message <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
