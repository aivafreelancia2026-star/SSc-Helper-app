"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AlertIcon } from "@/components/icons";

const inputBase =
  "w-full rounded-[20px] border-2 border-border bg-white/70 px-4 py-3 font-body text-base text-foreground placeholder:text-foreground/40 shadow-[inset_3px_3px_6px_rgba(79,70,229,0.08),inset_-3px_-3px_6px_rgba(255,255,255,0.7)] transition-colors focus:border-primary focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25";

const CLASS_OPTIONS = [6, 7, 8, 9, 10];

export function OnboardingForm({
  userId,
  email,
  defaultName,
}: {
  userId: string;
  email: string | null;
  defaultName: string;
}) {
  const router = useRouter();
  const [fullName, setFullName] = useState(defaultName);
  const [schoolName, setSchoolName] = useState("");
  const [classGrade, setClassGrade] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const supabase = createClient();
    const attempt = await supabase.from("profiles").upsert({
      id: userId,
      email,
      full_name: fullName.trim(),
      school_name: schoolName.trim(),
      class_grade: Number(classGrade),
    });

    // The email column was added after profiles already existed in
    // production — if that migration hasn't run yet here, retry without it
    // rather than blocking onboarding entirely. Remove once confirmed live.
    const { error } = attempt.error
      ? await supabase.from("profiles").upsert({
          id: userId,
          full_name: fullName.trim(),
          school_name: schoolName.trim(),
          class_grade: Number(classGrade),
        })
      : attempt;

    setIsSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[32px] border border-white/60 bg-white/80 p-6 shadow-[12px_12px_28px_rgba(79,70,229,0.12),-8px_-8px_20px_rgba(255,255,255,0.8)] backdrop-blur-sm sm:p-8"
    >
      <div className="space-y-5">
        <div>
          <label
            htmlFor="fullName"
            className="mb-1.5 block font-heading text-sm font-semibold text-foreground"
          >
            Your name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Priya Reddy"
            className={inputBase}
          />
        </div>

        <div>
          <label
            htmlFor="schoolName"
            className="mb-1.5 block font-heading text-sm font-semibold text-foreground"
          >
            School name
          </label>
          <input
            id="schoolName"
            name="schoolName"
            type="text"
            required
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            placeholder="e.g. Z.P.H.S. Peddajangampally"
            className={inputBase}
          />
        </div>

        <div>
          <label
            htmlFor="classGrade"
            className="mb-1.5 block font-heading text-sm font-semibold text-foreground"
          >
            Class
          </label>
          <select
            id="classGrade"
            name="classGrade"
            required
            value={classGrade}
            onChange={(e) => setClassGrade(e.target.value)}
            className={`${inputBase} cursor-pointer appearance-none`}
          >
            <option value="" disabled>
              Select your class
            </option>
            {CLASS_OPTIONS.map((grade) => (
              <option key={grade} value={grade}>
                Class {grade}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div
            role="alert"
            className="flex items-center gap-2 rounded-2xl bg-destructive/10 px-4 py-2.5 font-body text-sm font-semibold text-destructive"
          >
            <AlertIcon className="h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer rounded-[20px] bg-accent py-3.5 font-heading text-base font-bold text-on-primary shadow-[0_6px_0_#c2410c,0_10px_18px_rgba(234,88,12,0.35)] transition-all duration-150 ease-out hover:brightness-105 active:translate-y-1 active:shadow-[0_2px_0_#c2410c,0_4px_10px_rgba(234,88,12,0.35)] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30"
        >
          {isSubmitting ? "Saving..." : "Continue"}
        </button>
      </div>
    </form>
  );
}
