"use client";

import { useCallback, useEffect, useState } from "react";

import toast from "react-hot-toast";

export function useContacts(projectClient: any) {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] =
    useState<any | null>(null);

  const fetchContacts = useCallback(async () => {
    setLoading(true);

    const { data, error } =
      await projectClient
        .from("contacts")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      toast.error(
        "Failed to load contacts"
      );
    } else {
      setContacts(data || []);
    }

    setLoading(false);
  }, [projectClient]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const deleteContact = async (
    id: number
  ) => {
    const promise = projectClient
      .from("contacts")
      .delete()
      .eq("id", id);

    toast.promise(promise, {
      loading: "Deleting message...",
      success: "Message deleted",
      error: "Failed to delete message",
    });

    const { error } = await promise;

    if (!error) {
      setContacts((prev) =>
        prev.filter(
          (contact) => contact.id !== id
        )
      );
    }
  };

  return {
    contacts,
    loading,
    selectedContact,
    setSelectedContact,
    deleteContact,
    refreshContacts: fetchContacts,
  };
}
