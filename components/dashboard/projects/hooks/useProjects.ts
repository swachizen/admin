"use client";

import { useCallback, useEffect, useState } from "react";

import toast from "react-hot-toast";

export function useProjects(projectClient: any) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    setLoading(true);

    const { data, error } =
      await projectClient
        .from("projects")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      toast.error(
        "Failed to fetch projects"
      );
    } else {
      setProjects(data || []);
    }

    setLoading(false);
  }, [projectClient]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    setProjects,
    loading,
    refreshProjects: fetchProjects,
  };
}




