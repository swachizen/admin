export default function ContactSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <div className="animate-pulse rounded-3xl border border-border bg-surface p-5">
        <div className="h-12 rounded-2xl bg-surface-secondary" />

        <div className="mt-5 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-24 rounded-2xl bg-surface-secondary"
            />
          ))}
        </div>
      </div>

      <div className="animate-pulse rounded-3xl border border-border bg-surface p-8">
        <div className="h-8 w-48 rounded bg-surface-secondary" />

        <div className="mt-8 h-[500px] rounded-3xl bg-surface-secondary" />
      </div>
    </div>
  );
}
