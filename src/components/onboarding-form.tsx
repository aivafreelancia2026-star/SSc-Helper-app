"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AlertIcon } from "@/components/icons";
import { redeemRoleCode } from "@/lib/actions/redeem-role-code";

const inputBase =
  "w-full rounded-[20px] border-2 border-border bg-white/70 px-4 py-3 font-body text-base text-foreground placeholder:text-foreground/40 shadow-[inset_3px_3px_6px_rgba(79,70,229,0.08),inset_-3px_-3px_6px_rgba(255,255,255,0.7)] transition-colors focus:border-primary focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25";

const CLASS_OPTIONS = [6, 7, 8, 9, 10];

// Founder is deliberately left off this list — it's not something anyone
// self-selects at onboarding, only ever granted by redeeming a founder code.
type SelfReportedRole = "student" | "teacher" | "developer";
const ROLE_OPTIONS: { value: SelfReportedRole; label: string }[] = [
  { value: "student", label: "Student" },
  { value: "teacher", label: "Teacher" },
  { value: "developer", label: "Developer" },
];

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
  // Self-reported only — picking Teacher/Developer here doesn't grant that
  // role by itself, it just reveals the access-code field below. The role
  // that actually gets saved always comes from redeemRoleCode.
  const [claimedRole, setClaimedRole] = useState<SelfReportedRole>("student");
  const [accessCode, setAccessCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleCancelCode() {
    setClaimedRole("student");
    setAccessCode("");
    setError(null);
  }

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

    if (error) {
      setIsSubmitting(false);
      setError(error.message);
      return;
    }

    // No code entered — proceed as Student, the existing default. Only a
    // valid code actually changes the stored role.
    if (accessCode.trim()) {
      const codeResult = await redeemRoleCode(accessCode.trim());
      if (!codeResult.success) {
        setIsSubmitting(false);
        setError(codeResult.error);
        return;
      }
    }

    setIsSubmitting(false);
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

        <div>
          <label
            htmlFor="claimedRole"
            className="mb-1.5 block font-heading text-sm font-semibold text-foreground"
          >
            I am a...
          </label>
          <select
            id="claimedRole"
            name="claimedRole"
            value={claimedRole}
            onChange={(e) => setClaimedRole(e.target.value as SelfReportedRole)}
            className={`${inputBase} cursor-pointer appearance-none`}
          >
            {ROLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {claimedRole !== "student" && (
          <div className="rounded-[20px] border-2 border-dashed border-primary/40 bg-primary/5 p-4">
            <label
              htmlFor="accessCode"
              className="mb-1.5 block font-heading text-sm font-semibold text-foreground"
            >
              What&apos;s your code?
            </label>
            <p className="mb-2 font-body text-xs text-foreground/60">
              {ROLE_OPTIONS.find((o) => o.value === claimedRole)?.label} access needs a code from
              the SSC Helper team. Don&apos;t have one? Cancel and continue as a Student.
            </p>
            <input
              id="accessCode"
              name="accessCode"
              type="text"
              inputMode="numeric"
              pattern="[0-9]{4}"
              maxLength={4}
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="4-digit code"
              className={`${inputBase} mb-3 text-center tracking-[0.3em]`}
            />
            <button
              type="button"
              onClick={handleCancelCode}
              className="w-full cursor-pointer rounded-[16px] border-2 border-border bg-white py-2.5 font-heading text-sm font-bold text-foreground transition-colors hover:bg-muted"
            >
              Cancel — continue as Student
            </button>
          </div>
        )}

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
