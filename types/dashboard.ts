export type ViewState =
  | "dashboard"
  | "projects"
  | "contacts"
  | "add-project"
  | "edit-project";

export type Project = {
  id: string;

  title: string;

  slug: string;

  project_type: string;

  short_description: string;

  problem_solved: string;

  outcomes: string;

  tech_stack: string[];

  cover_photo: string;

  screenshots: string[];

  live_demo: string;

  github_link: string;

  featured: boolean;

  live_url?: string;

  supabase_url?: string;

  supabase_anon_key?: string;

  created_at: string;

  updated_at: string;
};
