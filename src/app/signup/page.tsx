"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  AlertIcon,
  CheckCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  GoogleLogo,
  LockIcon,
  MailIcon,
} from "@/components/icons";
import { BackgroundBlobs, LogoMark } from "@/components/logo-mark";
import { FeedbackButton } from "@/components/feedback-widget";
import { PAGES } from "@/lib/pages";

const inputBase =
  "w-full rounded-[20px] border-2 border-border bg-white/70 py-3 pl-11 pr-4 font-body text-base text-foreground placeholder:text-foreground/40 shadow-[inset_3px_3px_6px_rgba(79,70,229,0.08),inset_-3px_-3px_6px_rgba(255,255,255,0.7)] transition-colors focus:border-primary focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsEmailConfirmation, setNeedsEmailConfirmation] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setIsSubmitting(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    setIsSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }

    // If email confirmation is required, signUp succeeds but returns no
    // session until the user clicks the confirmation link.
    if (data.session) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setNeedsEmailConfirmation(true);
    }
  }

  async function handleGoogleSignIn() {
    setError(null);
    setIsGoogleLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) {
      setIsGoogleLoading(false);
      setError(error.message);
    }
    // On success the browser is redirected to Google, so no further action here.
  }

  return (
    <div
      data-page-id={PAGES.signup.id}
      className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-12"
    >
      <BackgroundBlobs />
      <FeedbackButton />

      <div className="relative z-10 w-full max-w-sm">
        <div className="mb-8 text-center">
          <LogoMark size="lg" />
          <h1 className="mt-4 font-heading text-3xl font-bold text-foreground">
            SSC Helper
          </h1>
          <p className="mt-1 font-body text-base text-foreground/60">
            Create your account
          </p>
        </div>

        <div className="rounded-[32px] border border-white/60 bg-white/80 p-6 shadow-[12px_12px_28px_rgba(79,70,229,0.12),-8px_-8px_20px_rgba(255,255,255,0.8)] backdrop-blur-sm sm:p-8">
          {needsEmailConfirmation ? (
            <div className="flex flex-col items-center gap-2 py-4 text-center">
              <CheckCircleIcon className="h-10 w-10 text-primary" />
              <p className="font-heading text-lg font-bold text-foreground">
                Check your email
              </p>
              <p className="font-body text-sm text-foreground/60">
                We sent a confirmation link to <strong>{email}</strong>. Click
                it to finish creating your account.
              </p>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-[20px] border-2 border-border bg-white py-3 font-heading text-sm font-semibold text-foreground shadow-[0_2px_6px_rgba(30,27,75,0.06)] transition-all duration-150 ease-out hover:bg-muted active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
              >
                <GoogleLogo className="h-5 w-5" />
                {isGoogleLoading ? "Redirecting…" : "Continue with Google"}
              </button>

              <div className="my-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-border" />
                <span className="font-body text-xs font-semibold uppercase tracking-wide text-foreground/40">
                  or continue with email
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>

              <form onSubmit={handleSubmit} method="post">
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block font-heading text-sm font-semibold text-foreground"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <MailIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/60" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className={inputBase}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="mb-1.5 block font-heading text-sm font-semibold text-foreground"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <LockIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/60" />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className={`${inputBase} pr-11`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        aria-pressed={showPassword}
                        className="absolute right-3.5 top-1/2 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-primary/60 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                      >
                        {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-1.5 block font-heading text-sm font-semibold text-foreground"
                    >
                      Confirm password
                    </label>
                    <div className="relative">
                      <LockIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/60" />
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        minLength={6}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className={inputBase}
                      />
                    </div>
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
                    {isSubmitting ? "Creating account..." : "Create account"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        <p className="mt-6 text-center font-body text-sm text-foreground/60">
          Already have an account?{" "}
          <Link
            href="/login"
            className="cursor-pointer font-semibold text-primary transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
