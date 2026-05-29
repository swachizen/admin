"use client";

import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

import { useProjects } from "./hooks/useProjects";

export default function ProjectsPanel({
  projectClient,
}: {
  projectClient: any;
}) {
  const {
    projects,
    setProjects,
    loading,
  } = useProjects(projectClient);

  return (
    <div className="grid gap-6 xl:grid-cols-[460px_1fr]">
      <ProjectForm
        projectClient={projectClient}
        setProjects={setProjects}
      />

      <div className="grid gap-5">
        {loading ? (
          <div className="grid gap-5 md:grid-cols-2">
            {Array.from({ length: 4 }).map(
              (_, i) => (
                <div
                  key={i}
                  className="h-[340px] animate-pulse rounded-3xl border border-border bg-surface"
                />
              )
            )}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                projectClient={projectClient}
                setProjects={setProjects}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
