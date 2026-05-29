"use client";

import { useMemo, useState } from "react";

import {
  Mail,
  MessageSquare,
  Trash2,
  Search,
} from "lucide-react";

import ContactLetter from "./ContactLetter";
import ContactSkeleton from "./ContactSkeleton";

import { useContacts } from "../hooks/useContacts";

export default function ContactsPanel({
  projectClient,
}: {
  projectClient: any;
}) {
  const {
    contacts,
    loading,
    deleteContact,
  } = useContacts(projectClient);

  const [search, setSearch] = useState("");

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      return (
        contact.full_name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        contact.email
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [contacts, search]);

  if (loading) {
    return <ContactSkeleton />;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <div className="surface rounded-3xl p-5 shadow-md">
        <div className="relative mb-5">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search messages"
            className="h-12 w-full rounded-2xl pl-11"
          />
        </div>

        <div className="flex max-h-[700px] flex-col gap-3 overflow-y-auto pr-2">
          {filteredContacts.map((contact) => (
            <ContactLetter
              key={contact.id}
              contact={contact}
              onDelete={deleteContact}
            />
          ))}
        </div>
      </div>

      <div className="surface rounded-3xl p-8 shadow-md">
        {filteredContacts.length === 0 ? (
          <div className="flex min-h-[500px] items-center justify-center rounded-3xl border border-dashed border-border">
            <p className="text-muted">
              No messages available.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="hover-lift rounded-3xl border border-border bg-background p-8"
              >
                <div className="space-y-1 text-sm leading-7 text-foreground-secondary">
                  <p>{contact.full_name}</p>
                  <p>{contact.phone}</p>
                  <p>
                    {contact.country},{" "}
                    {contact.county}
                  </p>
                </div>

                <div className="mt-6">
                  <p className="text-sm text-muted">
                    {new Date(
                      contact.created_at
                    ).toLocaleString()}
                  </p>
                </div>

                <div className="mt-6 border-b border-border pb-3">
                  <h2 className="text-xl font-semibold underline underline-offset-4">
                    {contact.email}
                  </h2>
                </div>

                <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
                  <p className="whitespace-pre-wrap text-[15px] leading-8 text-foreground-secondary">
                    {contact.message}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={`mailto:${contact.email}?cc=swalehmohamed203@gmail.com`}
                    className="flex items-center gap-2 rounded-2xl border border-accent/30 bg-accent/10 px-5 py-3 text-sm font-medium text-accent hover:bg-accent hover:text-white"
                  >
                    <Mail className="h-4 w-4" />
                    Reply via Email
                  </a>

                  <a
                    href={`sms:${contact.phone}`}
                    className="flex items-center gap-2 rounded-2xl border border-success/30 bg-success/10 px-5 py-3 text-sm font-medium text-success hover:bg-success hover:text-black"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Reply via Message
                  </a>

                  <button
                    onClick={() =>
                      deleteContact(contact.id)
                    }
                    className="flex items-center gap-2 rounded-2xl border border-danger/30 bg-danger/10 px-5 py-3 text-sm font-medium text-danger hover:bg-danger hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

