"use client";

import Image from "next/image";

import {
  ExternalLink,
  GitBranch,
  Pencil,
  Trash2,
} from "lucide-react";

import toast from "react-hot-toast";

export default function ProjectCard({
  project,
  projectClient,
  setProjects,
}: any) {
  const deleteProject = async () => {
    const promise = projectClient
      .from("projects")
      .delete()
      .eq("id", project.id);

    toast.promise(promise, {
      loading: "Deleting project...",
      success: "Project deleted",
      error: "Failed to delete project",
    });

    const { error } = await promise;

    if (!error) {
      setProjects((prev: any[]) =>
        prev.filter(
          (item) => item.id !== project.id
        )
      );
    }
  };

  return (
    <div className="hover-lift overflow-hidden rounded-3xl border border-border bg-surface shadow-md">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={project.cover_image}
          alt={project.title}
          fill
          loading="lazy"
          className="object-cover"
        />
      </div>

      <div className="space-y-5 p-6">
        <div>
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-foreground">
              {project.title}
            </h2>

            {project.featured && (
              <span className="rounded-full border border-warning/30 bg-warning/10 px-3 py-1 text-xs font-medium text-warning">
                Featured
              </span>
            )}
          </div>

          <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted">
            {project.short_description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech_stack.map(
            (tech: string) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted"
              >
                {tech}
              </span>
            )
          )}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href={project.live_demo}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm font-medium text-accent hover:bg-accent hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </a>

          <a
            href={project.github_link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground hover:border-accent/40"
          >
            <GitBranch className="h-4 w-4" />
            GitHub
          </a>

          <button className="flex items-center gap-2 rounded-2xl border border-warning/30 bg-warning/10 px-4 py-3 text-sm font-medium text-warning hover:bg-warning hover:text-black">
            <Pencil className="h-4 w-4" />
            Edit
          </button>

          <button
            onClick={deleteProject}
            className="flex items-center gap-2 rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm font-medium text-danger hover:bg-danger hover:text-white"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
