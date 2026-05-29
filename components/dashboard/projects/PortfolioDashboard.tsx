"use client";

import { useMemo, useState } from "react";

import DashboardShell from "./layout/DashboardShell";
import DashboardHeader from "./layout/DashboardHeader";
import ContactsPanel from "./contacts/ContactsPanel";
import ProjectsPanel from "./ProjectsPanel";

import { createProjectClient } from "@/lib/supabase/projects";

type PortfolioDashboardProps = {
  managedProject: {
    title: string;
    project_type: string;
    supabase_url: string;
    supabase_anon_key: string;
  };
};

export default function PortfolioDashboard({
  managedProject,
}: PortfolioDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    "contacts" | "projects"
  >("contacts");

  const projectClient = useMemo(() => {
    return createProjectClient(
      managedProject.supabase_url,
      managedProject.supabase_anon_key
    );
  }, [
    managedProject.supabase_url,
    managedProject.supabase_anon_key,
  ]);

  return (
    <DashboardShell>
      <DashboardHeader
        title={managedProject.title}
        projectType={
          managedProject.project_type
        }
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="grid gap-6">
        {activeTab === "contacts" ? (
          <ContactsPanel
            projectClient={projectClient}
          />
        ) : (
          <ProjectsPanel
            projectClient={projectClient}
          />
        )}
      </div>
    </DashboardShell>
  );
}
