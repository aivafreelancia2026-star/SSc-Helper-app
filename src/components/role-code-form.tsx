"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { redeemRoleCode } from "@/lib/actions/redeem-role-code";
import type { Role } from "@/lib/profile";

const ROLE_LABEL: Record<Role, string> = {
  founder: "Founder",
  developer: "Developer",
  teacher: "Teacher",
  student: "Student",
};

export function RoleCodeForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<Role | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    const result = await redeemRoleCode(code);

    setIsSubmitting(false);
    setCode("");

    if (!result.success) {
      setError(result.error);
      return;
    }

    setSuccess(result.role);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-3">
      <label htmlFor="role-code" className="block font-heading text-sm font-semibold text-foreground">
        Have a role code?
      </label>
      <div className="flex gap-2">
        <input
          id="role-code"
          type="text"
          inputMode="numeric"
          pattern="[0-9]{4}"
          maxLength={4}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder="4-digit code"
          className="w-full rounded-[16px] border-2 border-border bg-white/70 px-4 py-2.5 text-center font-heading text-lg tracking-[0.3em] text-foreground focus:border-primary focus:outline-none"
        />
        <button
          type="submit"
          disabled={code.length !== 4 || isSubmitting}
          className="shrink-0 cursor-pointer rounded-[16px] bg-primary px-5 py-2.5 font-heading text-sm font-bold text-on-primary transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isSubmitting ? "Checking…" : "Unlock"}
        </button>
      </div>

      {error && (
        <p role="alert" className="font-body text-sm font-semibold text-destructive">
          {error}
        </p>
      )}
      {success && (
        <p className="font-body text-sm font-semibold text-primary">
          You now have {ROLE_LABEL[success]} access.
        </p>
      )}
    </form>
  );
}
