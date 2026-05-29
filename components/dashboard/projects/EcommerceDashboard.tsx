"use client";

import type { SupabaseClient } from "@supabase/supabase-js";

type EcommerceDashboardProps = {
  managedProject: any;
  projectClient: SupabaseClient;
};

export default function EcommerceDashboard({
  managedProject,
  projectClient,
}: EcommerceDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-surface p-6">
        <h1 className="text-2xl font-semibold text-foreground">
          {managedProject.title}
        </h1>

        <p className="mt-2 text-sm text-muted">
          Ecommerce dashboard is under development.
        </p>
      </div>
    </div>
  );
}
