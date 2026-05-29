import type { ReactNode } from "react";

export default function DashboardShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background">
      <section className="container-width py-8 lg:py-10">
        <div className="flex flex-col gap-6">
          {children}
        </div>
      </section>
    </main>
  );
}
