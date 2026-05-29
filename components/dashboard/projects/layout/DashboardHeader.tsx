import { LayoutDashboard } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  projectType: string;
  activeTab: "contacts" | "projects";
  onTabChange: (
    tab: "contacts" | "projects"
  ) => void;
}

export default function DashboardHeader({
  title,
  projectType,
  activeTab,
  onTabChange,
}: DashboardHeaderProps) {
  return (
    <div className="glass rounded-3xl p-6 shadow-lg">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface-secondary">
            <LayoutDashboard className="h-6 w-6 text-accent" />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {title}
            </h1>

            <p className="mt-2 text-sm capitalize text-muted">
              {projectType} dashboard management
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              onTabChange("contacts")
            }
            className={`rounded-2xl border px-5 py-3 text-sm font-medium transition-all ${
              activeTab === "contacts"
                ? "border-accent bg-accent text-white"
                : "border-border bg-surface text-muted hover:border-accent/40 hover:text-foreground"
            }`}
          >
            Contacts
          </button>

          <button
            onClick={() =>
              onTabChange("projects")
            }
            className={`rounded-2xl border px-5 py-3 text-sm font-medium transition-all ${
              activeTab === "projects"
                ? "border-accent bg-accent text-white"
                : "border-border bg-surface text-muted hover:border-accent/40 hover:text-foreground"
            }`}
          >
            Projects
          </button>
        </div>
      </div>
    </div>
  );
}
