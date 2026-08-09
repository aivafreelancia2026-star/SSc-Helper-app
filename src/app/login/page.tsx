"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AlertIcon, EyeIcon, EyeSlashIcon, GoogleLogo, LockIcon, MailIcon } from "@/components/icons";
import { BackgroundBlobs, LogoMark } from "@/components/logo-mark";
import { FeedbackButton } from "@/components/feedback-widget";
import { PAGES } from "@/lib/pages";

const inputBase =
  "w-full rounded-[20px] border-2 border-border bg-white/70 py-3 pl-11 pr-4 font-body text-base text-foreground placeholder:text-foreground/40 shadow-[inset_3px_3px_6px_rgba(79,70,229,0.08),inset_-3px_-3px_6px_rgba(255,255,255,0.7)] transition-colors focus:border-primary focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/25";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setIsSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/dashboard");
    router.refresh();
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
      data-page-id={PAGES.login.id}
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
            Sign in to continue learning
          </p>
        </div>

        <div className="rounded-[32px] border border-white/60 bg-white/80 p-6 shadow-[12px_12px_28px_rgba(79,70,229,0.12),-8px_-8px_20px_rgba(255,255,255,0.8)] backdrop-blur-sm sm:p-8">
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
                <div className="mb-1.5 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block font-heading text-sm font-semibold text-foreground"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="cursor-pointer font-body text-sm font-semibold text-primary transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <LockIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/60" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
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
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center font-body text-sm text-foreground/60">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="cursor-pointer font-semibold text-primary transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
