"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import {
  Loader2,
  LogOut,
} from "lucide-react";

import { supabase } from "@/lib/supabaseClient";

export default function LogoutButton() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function handleLogout() {
    try {
      setLoading(true);

      const { error } =
        await supabase.auth.signOut();

      if (error) {
        toast.error(
          "Failed to logout."
        );

        return;
      }

      toast.success(
        "Logged out successfully."
      );

      router.replace("/login");

      router.refresh();
    } catch {
      toast.error(
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 text-sm font-medium text-red-500 transition-colors hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? (
        <>
          <Loader2
            size={18}
            className="animate-spin"
          />

          Logging out...
        </>
      ) : (
        <>
          <LogOut size={18} />

          Logout
        </>
      )}
    </button>
  );
}
