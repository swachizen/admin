"use client";

import clsx from "clsx";

type ContactLetterProps = {
  contact: {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    country: string;
    county: string;
    message: string;
    created_at: string;
    read?: boolean;
  };

  onDelete: (
    id: number
  ) => Promise<void> | void;
};

export default function ContactLetter({
  contact,
}: ContactLetterProps) {
  return (
    <button
      type="button"
      className={clsx(
        "hover-lift flex w-full flex-col rounded-2xl border p-4 text-left transition-all",
        contact.read
          ? "border-border bg-background"
          : "border-accent/30 bg-accent/5"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            {contact.full_name}
          </h3>

          <p className="mt-1 text-xs text-muted">
            {contact.email}
          </p>
        </div>

        {!contact.read && (
          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent" />
        )}
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-6 text-foreground-secondary">
        {contact.message}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-muted">
          {new Date(
            contact.created_at
          ).toLocaleDateString()}
        </span>

        <span
          className={clsx(
            "rounded-full px-2 py-1 text-[10px] font-medium uppercase tracking-wide",
            contact.read
              ? "bg-surface-secondary text-muted"
              : "bg-accent/10 text-accent"
          )}
        >
          {contact.read
            ? "Read"
            : "Unread"}
        </span>
      </div>
    </button>
  );
}
