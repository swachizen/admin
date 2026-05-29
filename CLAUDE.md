CLAUDE.md

Project Context

This is a modern multi-project admin platform built using:

- Next.js
- TypeScript
- Tailwind CSS
- Supabase

The architecture supports dynamic project dashboards powered by individual Supabase instances.

---

Core Architecture

Frontend

- App Router architecture
- Client/server component separation
- Responsive Tailwind UI
- Dynamic dashboard rendering

Backend

- Supabase PostgreSQL
- Supabase Storage
- Row Level Security
- Public portfolio APIs

---

Coding Standards

TypeScript

- Strict typing preferred
- Avoid "any" where possible
- Use reusable utility types

React

- Functional components only
- Hooks-based state management
- Keep components modular

Styling

- Tailwind CSS only
- Rounded modern UI
- Consistent spacing system
- Mobile-first responsive design

---

Important Rules

Do Not

- Break existing architecture
- Introduce unnecessary dependencies
- Use inline styles
- Use deprecated Next.js patterns

Always

- Keep JSX valid
- Use proper entity escaping
- Preserve accessibility
- Maintain production readiness

---

Supabase Rules

Storage

Bucket:

projects

Tables

Primary tables:

- projects
- contacts

Security

- RLS enabled
- Authenticated mutations only
- Public reads where required

---

Deployment

Frontend:

- Vercel

Backend:

- Supabase

---

Image Rules

All external image domains must exist inside:

next.config.ts

Use:

remotePatterns

instead of deprecated domains configuration.

---

Project Philosophy

The codebase should remain:

- scalable
- maintainable
- production-ready
- visually polished
- minimal
- high performance

---

UI Direction

Design language:

- clean
- modern
- glassmorphism-inspired
- dark-first
- subtle gradients
- soft shadows
- large rounded corners

---

Future Direction

Potential roadmap:

- RBAC
- audit logs
- server actions
- realtime subscriptions
- AI integrations
- multi-tenant dashboards
- analytics engine
