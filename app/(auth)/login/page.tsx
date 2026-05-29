"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";

import { supabase } from "@/lib/supabaseClient";

const MAX_ATTEMPTS = 3;

const LOCK_TIME = 15 * 60 * 1000;

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [acceptedTerms, setAcceptedTerms] =
    useState(false);

  const [failedAttempts, setFailedAttempts] =
    useState(0);

  const [lockUntil, setLockUntil] =
    useState<number | null>(null);

  const [remainingTime, setRemainingTime] =
    useState("");

  /*
  |--------------------------------------------------------------------------
  | Validators
  |--------------------------------------------------------------------------
  */

  const emailRegex =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const isEmailValid = useMemo(() => {
    return emailRegex.test(email.trim());
  }, [email]);

  const isPasswordValid = useMemo(() => {
    return password.trim().length >= 6;
  }, [password]);

  const isLocked = useMemo(() => {
    if (!lockUntil) {
      return false;
    }

    return Date.now() < lockUntil;
  }, [lockUntil]);

  const isFormValid =
    isEmailValid &&
    isPasswordValid &&
    acceptedTerms &&
    !loading &&
    !isLocked;

  /*
  |--------------------------------------------------------------------------
  | Restore Lock State
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const savedAttempts = localStorage.getItem(
      "login_failed_attempts"
    );

    const savedLockUntil = localStorage.getItem(
      "login_lock_until"
    );

    if (savedAttempts) {
      setFailedAttempts(Number(savedAttempts));
    }

    if (savedLockUntil) {
      setLockUntil(Number(savedLockUntil));
    }
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Redirect If Already Logged In
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.replace("/dashboard");
      }
    }

    checkSession();
  }, [router]);

  /*
  |--------------------------------------------------------------------------
  | Lock Countdown
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (lockUntil) {
      interval = setInterval(() => {
        const difference =
          lockUntil - Date.now();

        if (difference <= 0) {
          setLockUntil(null);

          setFailedAttempts(0);

          localStorage.removeItem(
            "login_failed_attempts"
          );

          localStorage.removeItem(
            "login_lock_until"
          );

          setRemainingTime("");

          return;
        }

        const minutes = Math.floor(
          (difference %
            (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const seconds = Math.floor(
          (difference % (1000 * 60)) /
            1000
        );

        setRemainingTime(
          `${minutes}m ${seconds
            .toString()
            .padStart(2, "0")}s`
        );
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [lockUntil]);

  /*
  |--------------------------------------------------------------------------
  | Handle Login
  |--------------------------------------------------------------------------
  */

async function handleLogin(
  event: React.FormEvent<HTMLFormElement>
) {
  event.preventDefault();

  if (!isFormValid) {
    return;
  }

  try {
    setLoading(true);

    /*
    |--------------------------------------------------------------------------
    | Login Directly With Supabase
    |--------------------------------------------------------------------------
    */

    const {
      data,
      error,
    } =
      await supabase.auth.signInWithPassword(
        {
          email: email.trim(),
          password,
        }
      );

    /*
    |--------------------------------------------------------------------------
    | Failed Login
    |--------------------------------------------------------------------------
    */

    if (error || !data.session) {
      const nextAttempts =
        failedAttempts + 1;

      setFailedAttempts(nextAttempts);

      localStorage.setItem(
        "login_failed_attempts",
        nextAttempts.toString()
      );

      if (
        nextAttempts >= MAX_ATTEMPTS
      ) {
        const lockTimestamp =
          Date.now() + LOCK_TIME;

        setLockUntil(lockTimestamp);

        localStorage.setItem(
          "login_lock_until",
          lockTimestamp.toString()
        );

        toast.error(
          "Too many failed attempts. Login disabled for 15 minutes."
        );

        return;
      }

      toast.error(
        error?.message ||
          "Invalid email or password."
      );

      return;
    }

    /*
    |--------------------------------------------------------------------------
    | Clear Lock State
    |--------------------------------------------------------------------------
    */

    localStorage.removeItem(
      "login_failed_attempts"
    );

    localStorage.removeItem(
      "login_lock_until"
    );

    setFailedAttempts(0);

    setLockUntil(null);

    /*
    |--------------------------------------------------------------------------
    | Success
    |--------------------------------------------------------------------------
    */

    toast.success(
      "Login successful."
    );

    /*
    |--------------------------------------------------------------------------
    | Wait For Session Persistence
    |--------------------------------------------------------------------------
    */

    await new Promise((resolve) =>
      setTimeout(resolve, 300)
    );

    /*
    |--------------------------------------------------------------------------
    | Redirect
    |--------------------------------------------------------------------------
    */

    window.location.href =
      "/dashboard";
  } catch {
    toast.error(
      "Something went wrong. Please try again."
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-10">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#11111118_1px,transparent_1px),linear-gradient(to_bottom,#11111118_1px,transparent_1px)] bg-[size:42px_42px]" />

      <section className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-3xl border border-border bg-background lg:grid-cols-2">
        <div className="hidden border-r border-border bg-background p-14 lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-10 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface">
                <ShieldCheck
                  size={22}
                  className="text-accent"
                />
              </div>

              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  Universal Admin
                </h1>

                <p className="text-sm text-muted">
                  Internal infrastructure platform
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="max-w-lg text-5xl font-semibold tracking-tight text-foreground">
                  Manage all your projects
                  from one secure dashboard.
                </h2>

                <p className="mt-6 max-w-xl text-base leading-8 text-muted">
                  Control analytics,
                  content, infrastructure,
                  media, deployments and
                  platform operations from
                  a modern Vercel-inspired
                  administration system.
                </p>
              </div>

              <div className="grid gap-4">
                {[
                  "Project-based management architecture",
                  "Secure Supabase authentication workflow",
                  "Advanced dashboard infrastructure",
                  "Professional internal operations platform",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-4"
                  >
                    <div className="h-2 w-2 rounded-full bg-accent" />

                    <span className="text-sm text-foreground-secondary">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-sm text-muted">
            Built with Next.js,
            Supabase and TypeScript.
          </p>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
                <span className="h-2 w-2 rounded-full bg-accent" />

                Secure Authentication
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                Welcome back
              </h2>

              <p className="mt-3 text-sm leading-7 text-muted">
                Sign in to access your
                administration platform and
                manage your infrastructure
                securely.
              </p>
            </div>

            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-foreground-secondary"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  />

                  <input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value
                      )
                    }
                    aria-invalid={
                      !isEmailValid &&
                      email.length > 0
                    }
                    className="h-12 w-full rounded-2xl border border-border bg-surface pl-12 pr-4 text-sm text-foreground placeholder:text-muted focus:border-accent"
                  />
                </div>

                {!isEmailValid &&
                  email.length > 0 && (
                    <p className="mt-2 text-sm text-danger">
                      Please enter a valid
                      email address.
                    </p>
                  )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-foreground-secondary"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    className="h-12 w-full rounded-2xl border border-border bg-surface pl-12 pr-14 text-sm text-foreground placeholder:text-muted focus:border-accent"
                  />

                  <button
                    type="button"
                    aria-label="Toggle password visibility"
                    onClick={() =>
                      setShowPassword(
                        (previous) =>
                          !previous
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {!isPasswordValid &&
                  password.length > 0 && (
                    <p className="mt-2 text-sm text-danger">
                      Password must contain
                      at least 6 characters.
                    </p>
                  )}
              </div>

              <div className="rounded-2xl border border-border bg-surface p-4">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={
                      acceptedTerms
                    }
                    onChange={(event) =>
                      setAcceptedTerms(
                        event.target.checked
                      )
                    }
                    className="mt-1 h-4 w-4 rounded border-border"
                  />

                  <span className="text-sm leading-6 text-muted">
                    I have read and
                    accepted the{" "}
                    <Link
                      href="/terms"
                      className="font-medium text-accent hover:text-accent-hover"
                    >
                      Terms &amp;
                      Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="font-medium text-accent hover:text-accent-hover"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={!isFormValid}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-accent px-4 text-sm font-medium text-accent-foreground disabled:cursor-not-allowed disabled:opacity-40 hover:bg-accent-hover"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    Signing in...
                  </>
                ) : (
                  <>
                    Login

                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>

              {isLocked && (
                <p className="text-center text-sm text-danger">
                  Too many failed login
                  attempts. Try again in{" "}
                  {remainingTime}.
                </p>
              )}

              {!acceptedTerms && (
                <p className="text-center text-xs text-muted">
                  You must accept the terms
                  before logging in.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
