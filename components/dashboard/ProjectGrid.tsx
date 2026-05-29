"use client";

import Image from "next/image";

import Link from "next/link";

import {
  AlertTriangle,
  ExternalLink,
  FolderKanban,
  Loader2,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import {
  Dispatch,
  RefObject,
  SetStateAction,
} from "react";

import {
  Project,
  ViewState,
} from "@/app/dashboard/page";

type ProjectGridProps = {
  loading: boolean;

  fetchError: string;

  projects: Project[];

  fetchProjects: () => void;

  setView: Dispatch<
    SetStateAction<ViewState>
  >;

  activeMenuId: string | null;

  setActiveMenuId: Dispatch<
    SetStateAction<string | null>
  >;

  handleEditClick: (
    project: Project
  ) => void;

  handleDeleteProject: (
    project: Project
  ) => void;

  deletingId: string | null;

  menuRef: RefObject<HTMLDivElement | null>;
};

export default function ProjectGrid({
  loading,
  fetchError,
  projects,
  fetchProjects,
  setView,
  activeMenuId,
  setActiveMenuId,
  handleEditClick,
  handleDeleteProject,
  deletingId,
  menuRef,
}: ProjectGridProps) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({
          length: 6,
        }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-3xl border border-border bg-surface"
          >
            <div className="aspect-[16/9] animate-pulse bg-surface-secondary" />

            <div className="space-y-4 p-5">
              <div className="h-5 w-3/4 animate-pulse rounded bg-surface-secondary" />

              <div className="h-4 w-full animate-pulse rounded bg-surface-secondary" />

              <div className="h-11 w-full animate-pulse rounded-2xl bg-surface-secondary" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-danger/30 bg-surface px-6 py-16 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-danger/20 bg-danger/10 text-danger">
          <AlertTriangle size={28} />
        </div>

        <h2 className="text-2xl font-semibold text-foreground">
          Failed to load projects
        </h2>

        <p className="mt-3 max-w-md text-sm leading-7 text-muted">
          {fetchError}
        </p>

        <button
          type="button"
          onClick={fetchProjects}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-2xl bg-accent px-5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
        >
          Retry
        </button>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-surface px-6 py-20 text-center">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-border bg-background">
          <FolderKanban
            size={34}
            className="text-accent"
          />
        </div>

        <h2 className="text-3xl font-semibold text-foreground">
          No managed projects found
        </h2>

        <p className="mt-4 max-w-md text-sm leading-7 text-muted">
          Start building your universal administration workspace by connecting your first managed project.
        </p>

        <button
          type="button"
          onClick={() =>
            setView(
              "add-project"
            )
          }
          className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-accent px-5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
        >
          <Plus size={18} />

          Add Managed Project
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => {
        const isMenuOpen =
          activeMenuId === project.id;

        const isDeleting =
          deletingId === project.id;

        return (
          <article
            key={project.id}
            className="group overflow-visible rounded-3xl border border-border bg-surface transition-all duration-300 hover:border-accent/40"
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-t-3xl border-b border-border">
              <Image
                src={
                  project.cover_photo
                }
                alt={project.title}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                unoptimized
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              <div className="absolute right-4 top-4 z-20">
                <div
                  ref={
                    isMenuOpen
                      ? menuRef
                      : null
                  }
                  className="relative"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setActiveMenuId(
                        isMenuOpen
                          ? null
                          : project.id
                      )
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/60"
                  >
                    <MoreHorizontal
                      size={18}
                    />
                  </button>

                  {isMenuOpen && (
                    <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
                      <button
                        type="button"
                        onClick={() =>
                          handleEditClick(
                            project
                          )
                        }
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-foreground transition-colors hover:bg-surface-secondary"
                      >
                        <Pencil size={16} />

                        Edit project
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteProject(
                            project
                          )
                        }
                        disabled={
                          isDeleting
                        }
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-danger transition-colors hover:bg-danger/10 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isDeleting ? (
                          <Loader2
                            size={16}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2
                            size={16}
                          />
                        )}

                        Delete project
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="mb-5">
                <h2 className="line-clamp-1 text-xl font-semibold text-foreground">
                  {project.title}
                </h2>

                <a
                  href={
                    project.live_url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <ExternalLink
                    size={15}
                  />

                  Visit live project
                </a>
              </div>

              <Link
                href={`/dashboard/${project.id}`}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-accent px-4 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
              >
                Manage Project
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
