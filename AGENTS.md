AGENTS.md

Purpose

This file defines behavioral and architectural guidelines for AI agents contributing to this repository.

---

Repository Type

Production-grade portfolio and dashboard platform.

---

Technology Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase

---

Primary Goals

Agents should prioritize:

1. Stability
2. Readability
3. Performance
4. Accessibility
5. Production readiness
6. Type safety

---

Coding Requirements

React

- Use functional components
- Prefer hooks
- Avoid class components

TypeScript

- Strong typing preferred
- Avoid unsafe patterns
- Preserve inference where possible

Styling

- Tailwind CSS only
- Maintain existing design system
- Preserve responsive behavior

---

Architectural Rules

Do Not

- Rewrite unrelated modules
- Introduce breaking changes
- Add unnecessary abstractions
- Replace existing stable systems

Always

- Keep components modular
- Preserve folder structure
- Maintain Supabase compatibility
- Keep RLS assumptions intact

---

Supabase Rules

Projects Table

Must support:

- image uploads
- screenshots
- featured projects
- public read access

Contacts Table

Must support:

- public inserts
- authenticated reads
- secure RLS policies

---

Security

Agents must preserve:

- RLS policies
- authenticated mutations
- secure storage access
- environment variable separation

---

Deployment Expectations

Application must remain deployable on:

- Vercel
- Supabase

without requiring infrastructure rewrites.

---

Code Quality

Preferred characteristics:

- minimal
- readable
- scalable
- production-ready
- composable
- accessible

---

UI Principles

Maintain:

- modern rounded interfaces
- clean typography
- responsive layouts
- dark-mode compatibility
- polished spacing

---

Performance Rules

Avoid:

- unnecessary rerenders
- duplicate Supabase clients
- oversized bundles
- blocking rendering logic

---

SEO Requirements

Preserve:

- metadata
- sitemap generation
- robots configuration
- semantic HTML

---

Final Rule

Every change should improve maintainability without reducing clarity or stability.
