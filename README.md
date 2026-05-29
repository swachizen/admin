Swaleh Universal Admin Platform

Modern multi-project admin platform built with Next.js, Supabase, Tailwind CSS, and TypeScript.

Overview

This project is a scalable portfolio and dashboard system that supports:

- Dynamic project dashboards
- Portfolio management
- Contact message management
- Multi-project Supabase architecture
- Image uploads with Supabase Storage
- Responsive modern UI
- Production-ready deployment setup

---

Tech Stack

Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Lucide React
- React Hot Toast

Backend

- Supabase Database
- Supabase Storage
- Supabase Authentication
- PostgreSQL

Deployment

- Vercel
- Supabase

---

Features

Portfolio Website

- Responsive landing pages
- Dynamic project showcase
- Live demo links
- Repository links
- Contact form integration

Dashboard

- Dynamic project management
- Image uploads
- Screenshot galleries
- Contact message viewer
- Project CRUD operations

Infrastructure

- Row Level Security
- Storage bucket policies
- Optimized image delivery
- Dynamic Supabase client architecture

---

Project Structure

app/
components/
hooks/
lib/
public/
types/

---

Environment Variables

Create a ".env.local" file:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

---

Installation

npm install

---

Development

npm run dev

---

Production Build

npm run build

---

Deployment

Vercel

Deploy frontend using Vercel:

https://vercel.com

Supabase

Backend infrastructure:

https://supabase.com

---

Supabase Setup

Run SQL setup files inside the Supabase SQL Editor:

- contacts table
- projects table
- storage policies
- row level security policies

---

Storage Buckets

Bucket used:

projects

Public bucket for optimized project asset delivery.

---

Security

Implemented:

- Row Level Security
- Protected admin actions
- Storage access policies
- Public read controls
- Authenticated mutation controls

---

Image Uploads

Supports:

- Cover images
- Project screenshots
- Multiple image uploads
- Supabase Storage integration

---

SEO

Includes:

- sitemap.ts
- robots.ts
- metadata support
- Open Graph support
- optimized image rendering

---

Future Improvements

- Admin authentication
- Role based access control
- Analytics dashboard
- Activity logs
- Real-time updates
- Server actions
- Image compression
- Drag and drop uploads
- Project editing workflows

---

License

Private proprietary project.

All rights reserved.

---

Author

Developer Swaleh
