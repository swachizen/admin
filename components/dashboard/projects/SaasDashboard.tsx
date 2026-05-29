"use client";

import type { SupabaseClient } from "@supabase/supabase-js";

type SaasDashboardProps = {
  managedProject: any;
  projectClient: SupabaseClient;
};

export default function SaasDashboard({
  managedProject,
  projectClient,
}: SaasDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-surface p-6">
        <h1 className="text-2xl font-semibold text-foreground">
          {managedProject.title}
        </h1>

        <p className="mt-2 text-sm text-muted">
          Saas dashboard is under development.
        </p>
      </div>
    </div>
  );
}
