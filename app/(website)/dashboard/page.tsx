"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import toast from "react-hot-toast";

import { supabase } from "@/lib/supabaseClient";

import DashboardHeader from "@/components/dashboard/DashboardHeader";

import ProjectForm from "@/components/dashboard/ProjectForm";

import ProjectGrid from "@/components/dashboard/ProjectGrid";

export type Project = {
  id: string;

  title: string;

  project_type: string;

  cover_photo: string;

  live_url: string;

  supabase_url: string;

  supabase_anon_key: string;

  created_at: string;
};

export type ViewState =
  | "dashboard"
  | "add-project"
  | "edit-project";

export default function DashboardPage() {
  const [projects, setProjects] =
    useState<Project[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [fetchError, setFetchError] =
    useState("");

  const [view, setView] =
    useState<ViewState>("dashboard");

  const [submitting, setSubmitting] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [
    editingProjectId,
    setEditingProjectId,
  ] = useState<string | null>(null);

  const [activeMenuId, setActiveMenuId] =
    useState<string | null>(null);

  const [title, setTitle] =
    useState("");

  const [projectType, setProjectType] =
    useState("");

  const [liveUrl, setLiveUrl] =
    useState("");

  const [supabaseUrl, setSupabaseUrl] =
    useState("");

  const [
    supabaseAnonKey,
    setSupabaseAnonKey,
  ] = useState("");

  const [coverPhoto, setCoverPhoto] =
    useState<File | null>(null);

  const [coverPreview, setCoverPreview] =
    useState("");

  const menuRef =
    useRef<HTMLDivElement | null>(null);

  const urlRegex =
    /^(https?:\/\/)([\w-]+\.)+[\w-]{2,}(\/.*)?$/i;

  const isFormValid = useMemo(() => {
    const isValidUrl =
      urlRegex.test(
        liveUrl.trim()
      );

    const isValidSupabaseUrl =
      urlRegex.test(
        supabaseUrl.trim()
      );

    if (view === "edit-project") {
      return (
        title.trim().length >= 2 &&
        projectType.trim().length > 0 &&
        isValidUrl &&
        isValidSupabaseUrl &&
        supabaseAnonKey.trim()
          .length > 0
      );
    }

    return (
      title.trim().length >= 2 &&
      projectType.trim().length > 0 &&
      isValidUrl &&
      isValidSupabaseUrl &&
      supabaseAnonKey.trim()
        .length > 0 &&
      Boolean(coverPhoto)
    );
  }, [
    coverPhoto,
    liveUrl,
    projectType,
    supabaseAnonKey,
    supabaseUrl,
    title,
    view,
  ]);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setActiveMenuId(null);
      }
    }

    window.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      window.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  async function fetchProjects() {
    try {
      setLoading(true);

      setFetchError("");

      const { data, error } =
        await supabase
          .from("managed_projects")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      if (error) {
        throw error;
      }

      setProjects(data || []);
    } catch (error) {
      console.error(error);

      setFetchError(
        "Failed to load projects. Please refresh the page."
      );
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setTitle("");

    setProjectType("");

    setLiveUrl("");

    setSupabaseUrl("");

    setSupabaseAnonKey("");

    setCoverPhoto(null);

    setCoverPreview("");

    setEditingProjectId(null);
  }

  function handleBack() {
    resetForm();

    setView("dashboard");
  }

  function handleCoverChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setCoverPhoto(file);

    setCoverPreview(
      URL.createObjectURL(file)
    );
  }

  async function uploadCoverPhoto(
    file: File
  ) {
    const fileExtension =
      file.name
        .split(".")
        .pop();

    const fileName = `${crypto.randomUUID()}.${fileExtension}`;

    const filePath = `projects/${fileName}`;

    const { error } =
      await supabase.storage
        .from("projects")
        .upload(
          filePath,
          file,
          {
            cacheControl: "3600",
            upsert: false,
          }
        );

    if (error) {
      throw error;
    }

    const { data } =
      supabase.storage
        .from("projects")
        .getPublicUrl(
          filePath
        );

    return data.publicUrl;
  }

  async function handleAddProject(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (
      !isFormValid ||
      !coverPhoto
    ) {
      return;
    }

    try {
      setSubmitting(true);

      const imageUrl =
        await uploadCoverPhoto(
          coverPhoto
        );

      const { error } =
        await supabase
          .from(
            "managed_projects"
          )
          .insert({
            title:
              title.trim(),

            project_type:
              projectType.trim(),

            live_url:
              liveUrl.trim(),

            cover_photo:
              imageUrl,

            supabase_url:
              supabaseUrl.trim(),

            supabase_anon_key:
              supabaseAnonKey.trim(),
          });

      if (error) {
        throw error;
      }

      toast.success(
        "Managed project connected successfully."
      );

      resetForm();

      setView("dashboard");

      fetchProjects();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to connect project."
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleEditProject(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!editingProjectId) {
      return;
    }

    try {
      setSubmitting(true);

      const { error } =
        await supabase
          .from(
            "managed_projects"
          )
          .update({
            title:
              title.trim(),

            project_type:
              projectType.trim(),

            live_url:
              liveUrl.trim(),

            supabase_url:
              supabaseUrl.trim(),

            supabase_anon_key:
              supabaseAnonKey.trim(),
          })
          .eq(
            "id",
            editingProjectId
          );

      if (error) {
        throw error;
      }

      toast.success(
        "Managed project updated successfully."
      );

      resetForm();

      setView("dashboard");

      fetchProjects();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update project."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleEditClick(
    project: Project
  ) {
    setEditingProjectId(
      project.id
    );

    setTitle(
      project.title
    );

    setProjectType(
      project.project_type
    );

    setLiveUrl(
      project.live_url
    );

    setSupabaseUrl(
      project.supabase_url
    );

    setSupabaseAnonKey(
      project.supabase_anon_key
    );

    setCoverPreview(
      project.cover_photo
    );

    setView(
      "edit-project"
    );

    setActiveMenuId(null);
  }

  async function handleDeleteProject(
    project: Project
  ) {
    try {
      setDeletingId(
        project.id
      );

      const filePath =
        project.cover_photo
          .split("/")
          .pop();

      if (filePath) {
        await supabase.storage
          .from("projects")
          .remove([
            `projects/${filePath}`,
          ]);
      }

      const { error } =
        await supabase
          .from(
            "managed_projects"
          )
          .delete()
          .eq(
            "id",
            project.id
          );

      if (error) {
        throw error;
      }

      setProjects(
        (previous) =>
          previous.filter(
            (item) =>
              item.id !==
              project.id
          )
      );

      toast.success(
        "Project deleted permanently."
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to delete project."
      );
    } finally {
      setDeletingId(null);

      setActiveMenuId(null);
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="container-width py-10">
        <DashboardHeader
          view={view}
          setView={setView}
        />

        {(view ===
          "add-project" ||
          view ===
            "edit-project") && (
          <ProjectForm
            view={view}
            title={title}
            setTitle={
              setTitle
            }
            projectType={
              projectType
            }
            setProjectType={
              setProjectType
            }
            supabaseUrl={
              supabaseUrl
            }
            setSupabaseUrl={
              setSupabaseUrl
            }
            supabaseAnonKey={
              supabaseAnonKey
            }
            setSupabaseAnonKey={
              setSupabaseAnonKey
            }
            liveUrl={
              liveUrl
            }
            setLiveUrl={
              setLiveUrl
            }
            coverPreview={
              coverPreview
            }
            submitting={
              submitting
            }
            isFormValid={
              isFormValid
            }
            handleBack={
              handleBack
            }
            handleCoverChange={
              handleCoverChange
            }
            handleAddProject={
              handleAddProject
            }
            handleEditProject={
              handleEditProject
            }
          />
        )}

        {view ===
          "dashboard" && (
          <ProjectGrid
            loading={
              loading
            }
            fetchError={
              fetchError
            }
            projects={
              projects
            }
            fetchProjects={
              fetchProjects
            }
            setView={
              setView
            }
            activeMenuId={
              activeMenuId
            }
            setActiveMenuId={
              setActiveMenuId
            }
            handleEditClick={
              handleEditClick
            }
            handleDeleteProject={
              handleDeleteProject
            }
            deletingId={
              deletingId
            }
            menuRef={
              menuRef
            }
          />
        )}
      </section>
    </main>
  );
}
