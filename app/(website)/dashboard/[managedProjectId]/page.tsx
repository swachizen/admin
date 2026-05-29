import { notFound } from "next/navigation";

import { supabase } from "@/lib/supabaseClient";

import { createProjectClient } from "@/lib/supabase/projects";

import PortfolioDashboard from "@/components/dashboard/projects/PortfolioDashboard";

import EcommerceDashboard from "@/components/dashboard/projects/EcommerceDashboard";

import SaasDashboard from "@/components/dashboard/projects/SaasDashboard";

type ProjectPageProps = {
  params: Promise<{
    managedProjectId: string;
  }>;
};

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { managedProjectId } =
    await params;

  /*
  |--------------------------------------------------------------------------
  | Fetch Managed Project
  |--------------------------------------------------------------------------
  */

  const {
    data: managedProject,
    error,
  } = await supabase
    .from("managed_projects")
    .select("*")
    .eq("id", managedProjectId)
    .single();

  /*
  |--------------------------------------------------------------------------
  | DEBUG LOGS
  |--------------------------------------------------------------------------
  */

  console.log(
    "MANAGED PROJECT ID:",
    managedProjectId
  );

  console.log(
    "SUPABASE ERROR:",
    error
  );

  console.log(
    "MANAGED PROJECT:",
    managedProject
  );

  if (error || !managedProject) {
    return (
      <main className="min-h-screen bg-background">
        <section className="container-width py-10">
          <div className="rounded-3xl border border-danger/30 bg-surface p-8">
            <h1 className="text-2xl font-semibold text-danger">
              Failed To Load Project
            </h1>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-border bg-background p-5">
                <p className="text-xs uppercase tracking-wide text-muted">
                  Project ID
                </p>

                <p className="mt-2 text-sm text-foreground">
                  {managedProjectId}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-5">
                <p className="text-xs uppercase tracking-wide text-muted">
                  Supabase Error
                </p>

                <pre className="mt-2 overflow-x-auto text-sm text-danger">
                  {JSON.stringify(
                    error,
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Create Dynamic Supabase Client
  |--------------------------------------------------------------------------
  */

   <PortfolioDashboard
  managedProject={managedProject}
  supabaseUrl={managedProject.supabase_url}
  supabaseAnonKey={managedProject.supabase_anon_key}
/>
  /*
  |--------------------------------------------------------------------------
  | Normalize Project Type
  |--------------------------------------------------------------------------
  */

  const projectType =
    managedProject.project_type
      ?.trim()
      ?.toLowerCase();

  /*
  |--------------------------------------------------------------------------
  | Dynamic Dashboard Routing
  |--------------------------------------------------------------------------
  */

  switch (projectType) {
    case "portfolio":
      return (
        <PortfolioDashboard
          managedProject={
            managedProject
          }
          supabaseUrl={
           managedProject.supabase_url
          }
          supabaseAnonKey={
           managedProject.supabase_anon_key
          }
        />
      );

    default:
      return (
        <main className="min-h-screen bg-background">
          <section className="container-width py-10">
            <div className="rounded-3xl border border-border bg-surface p-8">
              <h1 className="text-2xl font-semibold text-foreground">
                Unsupported Project Type
              </h1>

              <p className="mt-3 text-sm text-muted">
                No dashboard handler exists for:
              </p>

              <div className="mt-5 rounded-2xl border border-border bg-background p-5">
                <p className="text-sm text-foreground">
                  {
                    managedProject.project_type
                  }
                </p>
              </div>
            </div>
          </section>
        </main>
      );
  }
}
