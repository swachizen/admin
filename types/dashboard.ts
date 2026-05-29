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

  short_description: string;

  problem_solved: string;

  outcomes: string;

  tech_stack: string[];

  cover_image: string;

  screenshots: string[];

  live_demo: string;

  github_link: string;

  featured: boolean;

  created_at: string;

  updated_at: string;
};
