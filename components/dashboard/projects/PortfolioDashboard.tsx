"use client";

import { useMemo, useState } from "react";

import type { SupabaseClient } from "@supabase/supabase-js";

import DashboardShell from "./layout/DashboardShell";
import DashboardHeader from "./layout/DashboardHeader";

import ContactsPanel from "./contacts/ContactsPanel";
import ProjectsPanel from "./ProjectsPanel";

import { createProjectClient } from "@/lib/supabase/projects";

type PortfolioDashboardProps = {
  managedProject: any;

  supabaseUrl: string;

  supabaseAnonKey: string;
};

export default function PortfolioDashboard({
  managedProject,
  supabaseUrl,
  supabaseAnonKey,
}: PortfolioDashboardProps) {
  const [activeTab, setActiveTab] =
    useState<
      "contacts" | "projects"
    >("contacts");

  const projectClient: SupabaseClient =
    useMemo(() => {
      return createProjectClient(
        supabaseUrl,
        supabaseAnonKey
      );
    }, [
      supabaseUrl,
      supabaseAnonKey,
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
