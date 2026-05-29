"use client";

import { useState } from "react";

import Image from "next/image";

import toast from "react-hot-toast";

import {
  Loader2,
  Plus,
  Upload,
  X,
} from "lucide-react";

type ProjectFormProps = {
  projectClient: any;
  setProjects: React.Dispatch<
    React.SetStateAction<any[]>
  >;
};

const initialState = {
  title: "",
  slug: "",
  short_description: "",
  problem_solved: "",
  outcomes: "",
  tech_stack: "",
  live_demo: "",
  github_link: "",
  featured: false,
};

export default function ProjectForm({
  projectClient,
  setProjects,
}: ProjectFormProps) {
  const [formData, setFormData] =
    useState(initialState);

  const [coverImage, setCoverImage] =
    useState<File | null>(null);

  const [coverPreview, setCoverPreview] =
    useState("");

  const [
    screenshotFiles,
    setScreenshotFiles,
  ] = useState<File[]>([]);

  const [
    screenshotPreviews,
    setScreenshotPreviews,
  ] = useState<string[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  const handleChange = (
    field: string,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = () => {
    const newErrors: Record<
      string,
      string
    > = {};

    if (
      formData.title.trim().length < 3
    ) {
      newErrors.title =
        "Title must be at least 3 characters.";
    }

    if (
      formData.slug.trim().length < 3
    ) {
      newErrors.slug =
        "Slug must be at least 3 characters.";
    }

    if (
      formData.short_description.trim()
        .length < 20
    ) {
      newErrors.short_description =
        "Short description must be at least 20 characters.";
    }

    if (
      formData.problem_solved.trim()
        .length < 20
    ) {
      newErrors.problem_solved =
        "Problem solved must be at least 20 characters.";
    }

    if (
      formData.outcomes.trim()
        .length < 20
    ) {
      newErrors.outcomes =
        "Outcomes must be at least 20 characters.";
    }

    if (!coverImage) {
      newErrors.cover_image =
        "Cover image is required.";
    }

    if (!formData.live_demo.trim()) {
      newErrors.live_demo =
        "Live demo URL is required.";
    }

    if (!formData.github_link.trim()) {
      newErrors.github_link =
        "Repository URL is required.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const uploadImage = async (
    file: File
  ) => {
    const fileExt =
      file.name.split(".").pop();

    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    const filePath = `projects/${fileName}`;

    const { error } =
      await projectClient.storage
        .from("projects")
        .upload(filePath, file);

    if (error) {
      throw error;
    }

    const { data } =
      projectClient.storage
        .from("projects")
        .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      toast.loading(
        "Uploading project assets...",
        {
          id: "project-upload",
        }
      );

      const coverImageUrl =
        await uploadImage(coverImage!);

      const screenshotUrls =
        await Promise.all(
          screenshotFiles.map((file) =>
            uploadImage(file)
          )
        );

      const payload = {
        title: formData.title.trim(),

        slug: formData.slug
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-"),

        short_description:
          formData.short_description.trim(),

        problem_solved:
          formData.problem_solved.trim(),

        outcomes:
          formData.outcomes.trim(),

        tech_stack:
          formData.tech_stack
            .split(",")
            .map((item) =>
              item.trim()
            )
            .filter(Boolean),

        screenshots: screenshotUrls,

        cover_image:
          coverImageUrl,

        live_demo:
          formData.live_demo.trim(),

        github_link:
          formData.github_link.trim(),

        featured:
          formData.featured,
      };

      const { data, error } =
        await projectClient
          .from("projects")
          .insert(payload)
          .select()
          .single();

      toast.dismiss(
        "project-upload"
      );

      if (error) {
        console.error(error);

        toast.error(
          "Failed to create project."
        );

        return;
      }

      setProjects((prev) => [
        data,
        ...prev,
      ]);

      toast.success(
        "Project created successfully."
      );

      setFormData(initialState);

      setCoverImage(null);

      setCoverPreview("");

      setScreenshotFiles([]);

      setScreenshotPreviews([]);
    } catch (error) {
      console.error(error);

      toast.dismiss(
        "project-upload"
      );

      toast.error(
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="surface sticky top-6 rounded-3xl p-6 shadow-md"
    >
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background">
          <Plus className="h-5 w-5 text-accent" />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Create Project
          </h2>

          <p className="mt-1 text-sm text-muted">
            Add a new portfolio project.
          </p>
        </div>
      </div>

      <div className="grid gap-5">
        <input
          type="text"
          placeholder="Project title"
          value={formData.title}
          onChange={(event) =>
            handleChange(
              "title",
              event.target.value
            )
          }
          className="h-12 rounded-2xl px-4"
        />

        <input
          type="text"
          placeholder="project-slug"
          value={formData.slug}
          onChange={(event) =>
            handleChange(
              "slug",
              event.target.value
            )
          }
          className="h-12 rounded-2xl px-4"
        />

        <textarea
          rows={4}
          placeholder="Short description"
          value={
            formData.short_description
          }
          onChange={(event) =>
            handleChange(
              "short_description",
              event.target.value
            )
          }
          className="rounded-2xl px-4 py-4"
        />

        <textarea
          rows={4}
          placeholder="Problem solved"
          value={
            formData.problem_solved
          }
          onChange={(event) =>
            handleChange(
              "problem_solved",
              event.target.value
            )
          }
          className="rounded-2xl px-4 py-4"
        />

        <textarea
          rows={4}
          placeholder="Outcomes"
          value={formData.outcomes}
          onChange={(event) =>
            handleChange(
              "outcomes",
              event.target.value
            )
          }
          className="rounded-2xl px-4 py-4"
        />

        <input
          type="text"
          placeholder="React, Next.js, Supabase"
          value={formData.tech_stack}
          onChange={(event) =>
            handleChange(
              "tech_stack",
              event.target.value
            )
          }
          className="h-12 rounded-2xl px-4"
        />

        <div className="space-y-3">
          <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-background px-5 py-6 text-sm text-muted transition-all hover:border-accent">
            <Upload className="h-5 w-5" />

            Upload Cover Image

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const file =
                  event.target.files?.[0];

                if (!file) {
                  return;
                }

                setCoverImage(file);

                setCoverPreview(
                  URL.createObjectURL(file)
                );
              }}
            />
          </label>

          {coverPreview && (
            <div className="relative h-52 overflow-hidden rounded-3xl border border-border">
              <Image
                src={coverPreview}
                alt="Cover preview"
                fill
                className="object-cover"
              />
            </div>
          )}

          {errors.cover_image && (
            <p className="text-sm text-danger">
              {errors.cover_image}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-background px-5 py-6 text-sm text-muted transition-all hover:border-accent">
            <Upload className="h-5 w-5" />

            Upload Screenshots

            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const files = Array.from(
                  event.target.files || []
                );

                setScreenshotFiles(files);

                setScreenshotPreviews(
                  files.map((file) =>
                    URL.createObjectURL(
                      file
                    )
                  )
                );
              }}
            />
          </label>

          {screenshotPreviews.length >
            0 && (
            <div className="grid grid-cols-2 gap-3">
              {screenshotPreviews.map(
                (preview, index) => (
                  <div
                    key={index}
                    className="relative h-32 overflow-hidden rounded-2xl border border-border"
                  >
                    <Image
                      src={preview}
                      alt={`Screenshot ${
                        index + 1
                      }`}
                      fill
                      className="object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setScreenshotFiles(
                          (prev) =>
                            prev.filter(
                              (
                                _,
                                i
                              ) =>
                                i !==
                                index
                            )
                        );

                        setScreenshotPreviews(
                          (prev) =>
                            prev.filter(
                              (
                                _,
                                i
                              ) =>
                                i !==
                                index
                            )
                        );
                      }}
                      className="absolute right-2 top-2 rounded-full bg-black/70 p-1 text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        <input
          type="url"
          placeholder="Live demo URL"
          value={formData.live_demo}
          onChange={(event) =>
            handleChange(
              "live_demo",
              event.target.value
            )
          }
          className="h-12 rounded-2xl px-4"
        />

        <input
          type="url"
          placeholder="Repository URL"
          value={formData.github_link}
          onChange={(event) =>
            handleChange(
              "github_link",
              event.target.value
            )
          }
          className="h-12 rounded-2xl px-4"
        />

        <label className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-4 text-sm text-foreground">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(event) =>
              handleChange(
                "featured",
                event.target.checked
              )
            }
          />

          Featured project
        </label>

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-accent font-medium text-white transition-all hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating project...
            </>
          ) : (
            "Create Project"
          )}
        </button>
      </div>
    </form>
  );
}
