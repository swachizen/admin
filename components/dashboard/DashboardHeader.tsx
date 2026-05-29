"use client";

import { Plus } from "lucide-react";

import LogoutButton from "./LogoutButton";

import type { ViewState } from "@/types/dashboard";

type DashboardHeaderProps = {
  view: ViewState;

  setView: React.Dispatch<
    React.SetStateAction<ViewState>
  >;
};

export default function DashboardHeader({
  view,
  setView,
}: Props) {
  return (
    <header className="mb-10 flex flex-col gap-6 border-b border-border pb-8 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
          <span className="h-2 w-2 rounded-full bg-accent" />

          Universal Admin
        </div>

        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          Projects Dashboard
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          Manage all your personal
          infrastructure projects,
          platforms and deployments from
          one professional administration
          dashboard.
        </p>
      </div>

      <div className="flex items-center gap-3">
        {view === "projects" && (
          <button
            type="button"
            onClick={() =>
              setView("add-project")
            }
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-accent px-5 text-sm font-medium text-accent-foreground hover:bg-accent-hover"
          >
            <Plus size={18} />

            Add Project
          </button>
        )}

        <LogoutButton />
      </div>
    </header>
  );
}
