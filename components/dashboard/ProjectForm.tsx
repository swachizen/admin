"use client";

import Image from "next/image";

import {
  ArrowLeft,
  Loader2,
} from "lucide-react";

import {
  ChangeEvent,
  FormEvent,
} from "react";

import {
  ViewState,
} from "@/types/dashboard.ts";

type ProjectFormProps = {
  view: ViewState;

  title: string;

  setTitle: (
    value: string
  ) => void;

  projectType: string;

  setProjectType: (
    value: string
  ) => void;

  supabaseUrl: string;

  setSupabaseUrl: (
    value: string
  ) => void;

  supabaseAnonKey: string;

  setSupabaseAnonKey: (
    value: string
  ) => void;

  liveUrl: string;

  setLiveUrl: (
    value: string
  ) => void;

  coverPreview: string;

  submitting: boolean;

  isFormValid: boolean;

  handleBack: () => void;

  handleCoverChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;

  handleAddProject: (
    event: FormEvent<HTMLFormElement>
  ) => void;

  handleEditProject: (
    event: FormEvent<HTMLFormElement>
  ) => void;
};

export default function ProjectForm({
  view,
  title,
  setTitle,
  projectType,
  setProjectType,
  supabaseUrl,
  setSupabaseUrl,
  supabaseAnonKey,
  setSupabaseAnonKey,
  liveUrl,
  setLiveUrl,
  coverPreview,
  submitting,
  isFormValid,
  handleBack,
  handleCoverChange,
  handleAddProject,
  handleEditProject,
}: ProjectFormProps) {
  const urlRegex =
    /^(https?:\/\/)([\w-]+\.)+[\w-]{2,}(\/.*)?$/i;

  const isInvalidLiveUrl =
    liveUrl.length > 0 &&
    !urlRegex.test(
      liveUrl.trim()
    );

  const isInvalidSupabaseUrl =
    supabaseUrl.length > 0 &&
    !urlRegex.test(
      supabaseUrl.trim()
    );

  return (
    <section className="mx-auto w-full max-w-2xl rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            {view === "add-project"
              ? "Add Managed Project"
              : "Edit Managed Project"}
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-7 text-muted">
            {view === "add-project"
              ? "Connect and manage external projects securely from your universal administration dashboard."
              : "Update your managed project configuration, deployment details and Supabase connection settings."}
          </p>
        </div>

        <button
          type="button"
          onClick={handleBack}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowLeft size={16} />

          Back
        </button>
      </div>

      <form
        onSubmit={
          view === "add-project"
            ? handleAddProject
            : handleEditProject
        }
        className="space-y-6"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground-secondary">
            Project title
          </label>

          <input
            type="text"
            placeholder="Universal Portfolio"
            value={title}
            onChange={(event) =>
              setTitle(
                event.target.value
              )
            }
            className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-accent"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground-secondary">
            Project type
          </label>

          <select
            value={projectType}
            onChange={(event) =>
              setProjectType(
                event.target.value
              )
            }
            className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors focus:border-accent"
          >
            <option value="">
              Select project type
            </option>

            <option value="portfolio">
              portfolio
            </option>

            <option value="cms">
              cms
            </option>

            <option value="ecommerce">
              ecommerce
            </option>

            <option value="saas">
              saas
            </option>

            <option value="blog">
              Blog
            </option>

            <option value="dashboard">
              Dashboard
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground-secondary">
            Live URL
          </label>

          <input
            type="url"
            placeholder="https://yourwebsite.com"
            value={liveUrl}
            onChange={(event) =>
              setLiveUrl(
                event.target.value
              )
            }
            className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-accent"
          />

          {isInvalidLiveUrl && (
            <p className="mt-2 text-sm text-danger">
              Please enter a valid URL.
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground-secondary">
            Supabase project URL
          </label>

          <input
            type="url"
            placeholder="https://your-project.supabase.co"
            value={supabaseUrl}
            onChange={(event) =>
              setSupabaseUrl(
                event.target.value
              )
            }
            className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-accent"
          />

          {isInvalidSupabaseUrl && (
            <p className="mt-2 text-sm text-danger">
              Please enter a valid Supabase URL.
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground-secondary">
            Supabase anon key
          </label>

          <textarea
            rows={6}
            placeholder="Paste your Supabase anon key"
            value={supabaseAnonKey}
            onChange={(event) =>
              setSupabaseAnonKey(
                event.target.value
              )
            }
            className="w-full rounded-2xl border border-border bg-background px-4 py-4 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-accent"
          />

          <p className="mt-2 text-xs leading-6 text-muted">
            This key is used to securely connect and manage your external project&apos;s database and APIs.
          </p>
        </div>

        {view === "add-project" && (
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground-secondary">
              Cover photo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={
                handleCoverChange
              }
              className="block w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted file:mr-4 file:rounded-xl file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-medium file:text-accent-foreground"
            />

            {coverPreview && (
              <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
                <Image
                  src={coverPreview}
                  alt="Project preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
          </div>
        )}

        {view === "edit-project" &&
          coverPreview && (
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground-secondary">
                Existing cover photo
              </label>

              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border">
                <Image
                  src={coverPreview}
                  alt="Project cover"
                  fill
                  loading="lazy"
                  className="object-cover"
                  unoptimized
                />
              </div>

              <p className="mt-2 text-xs leading-6 text-muted">
                Cover photo editing is disabled for existing projects.
              </p>
            </div>
          )}

        <button
          type="submit"
          disabled={
            !isFormValid ||
            submitting
          }
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-accent px-4 text-sm font-medium text-accent-foreground transition-all hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
        >
          {submitting ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />

              {view ===
              "add-project"
                ? "Connecting project..."
                : "Updating project..."}
            </>
          ) : (
            <>
              {view ===
              "add-project"
                ? "Add Managed Project"
                : "Update Managed Project"}
            </>
          )}
        </button>
      </form>
    </section>
  );
}
