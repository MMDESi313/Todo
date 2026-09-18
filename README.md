<p align="center">
  <a href="./README.md"><img src="https://img.shields.io/badge/🇬🇧-English-2563eb?style=for-the-badge" alt="English" /></a>
  <a href="./README.fa.md"><img src="https://img.shields.io/badge/🇮🇷-فارسی-16a34a?style=for-the-badge" alt="فارسی" /></a>
</p>

<p align="center"><a href="./README.fa.md">فارسی</a> | <strong>English</strong></p>

<h1 align="center">Todo — A Full-Stack Task Manager</h1>

<p align="center">
A full-stack todo application built as a portfolio project, featuring a real Persian (Jalali) calendar,<br/>
a manual session-based auth system, and a fully custom analytics dashboard — no template, no boilerplate.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Prisma-7-2D3748?style=flat&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-Supabase-4169E1?style=flat&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat" alt="MIT License" />
</p>

<p align="center">
  <strong><a href="https://todo-pied-gamma.vercel.app/">🔗 Live Demo</a></strong>
</p>

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture & Key Decisions](#architecture--key-decisions)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Roadmap](#roadmap)
- [License](#license)

## Features

- **Authentication** — Sign up / log in / log out with hashed passwords (bcrypt) and database-backed sessions stored in httpOnly cookies. No third-party auth library.
- **Profile** — Edit name and username, change password (invalidates all other active sessions).
- **Tags** — Create, edit, and delete tags with a 10-color palette. Names are unique per user.
- **Tasks** — Full CRUD with title, description, priority (Low/Medium/High), a due date & time (via a native Persian calendar and a custom scrollable time picker), and multiple tags per task.
- **Task status** — Todo / In Progress / Done / Not Done. Once a task is resolved (Done or Not Done), its status is locked — a deliberate choice, explained below.
- **Daily calendar** — Browse tasks day by day with a Jalali week strip and a full month picker; the selected day's data is fetched fresh from the server.
- **Filtering & search** — Filter the current day's tasks by status and priority, and search by title, instantly, client-side.
- **Dashboard** — Today's progress bar and stats, the 3 nearest upcoming tasks, overdue tasks with one-click resolution, a 7-day completion chart, and an all-time donut chart.
- **Dark mode** and full **RTL** support throughout.

## Tech Stack

| Layer              | Technology                                         |
| ------------------ | -------------------------------------------------- |
| Framework          | Next.js 16 (App Router, Server Actions)            |
| Language           | TypeScript                                         |
| Styling            | Tailwind CSS v4, shadcn/ui                         |
| Forms & Validation | React Hook Form, Zod                               |
| Database           | PostgreSQL (hosted on Supabase)                    |
| ORM                | Prisma 7 (driver adapters)                         |
| Calendar           | react-day-picker (Persian/Jalali), date-fns-jalali |
| Notifications      | Sonner                                             |
| Deployment         | Vercel                                             |

## Architecture & Key Decisions

A few choices worth calling out, since they were made deliberately rather than by default:

- **Session-based auth over JWT.** Sessions are stored in the database and referenced by an opaque ID in an httpOnly cookie. This trades a small amount of per-request query overhead (a single indexed lookup) for the ability to instantly revoke access — logging out, or changing a password, immediately invalidates the relevant sessions. That's not possible with stateless JWTs without adding a denylist layer, which ends up being the same complexity anyway.
- **Task status is locked after resolution.** Once a task is marked Done or Not Done, it can no longer be changed. This keeps the dashboard's historical stats (the 7-day chart, all-time totals) trustworthy — without this rule, "history" could be silently rewritten at any time.
- **"Not Done" is set manually, never automatically.** No background job scans for overdue tasks. Whether a task is done or not is a fact the user reports, not one the system infers — a task that's simply late stays in its normal state until the user resolves it.
- **Filtering is client-side, not server-side.** Since the daily task view already fetches a full day's data in one request, filtering and searching within that data happens instantly in the browser, with no extra round trip. A dashboard-wide filter (across a user's entire task history) would be server-side instead, since that data set isn't already loaded — see [Roadmap](#roadmap).
- **Timezone handling is explicit, not assumed.** All date logic (what counts as "today," the 7-day window, overdue detection) is anchored to `Asia/Tehran` rather than the server's local time, which matters because Vercel's serverless functions run in UTC by default — without this, dates could silently shift by a few hours in production.

## Database Schema

| Model     | Purpose                                                          |
| --------- | ---------------------------------------------------------------- |
| `User`    | Account info — name, username, hashed password                   |
| `Session` | Active login sessions, referenced by the auth cookie             |
| `Task`    | Title, description, priority, status, due date, owner            |
| `Tag`     | Name + color (1–10), owned by a user                             |
| `TaskTag` | Join table implementing the Task ↔ Tag many-to-many relationship |

## Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (e.g. a free [Supabase](https://supabase.com) project)

### Setup

```bash
git clone <this-repo-url>
cd <project-folder>
npm install
```

Create a `.env` file in the project root:

```env
DATABASE_URL="postgres://...pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgres://...pooler.supabase.com:5432/postgres"
```

Run the initial migration:

```bash
npx prisma migrate dev
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command             | Description                                                          |
| ------------------- | -------------------------------------------------------------------- |
| `npm run dev`       | Start the development server                                         |
| `npm run build`     | Generate the Prisma client, run migrations, and build for production |
| `npm run start`     | Start the production server                                          |
| `npx prisma studio` | Open a GUI to browse the database                                    |

## Roadmap

Features considered and intentionally deferred, in rough order of priority:

- [ ] **Undo** for destructive actions (delete, mark done) via a brief, dismissible toast
- [ ] Server-side filtering & search across a user's **entire** task history, surfaced on the dashboard
- [ ] Filtering tasks by tag, in addition to status and priority
- [ ] Deeper productivity analytics (completion streaks, best/worst day of the week)
- [ ] Subtasks / checklists within a task
- [ ] In-app (non-email) reminders for upcoming due dates

## License

MIT — feel free to use this project as a reference or a starting point.

---

<div align="center">

This README file generated by AI.
Made with ❤️ by **MMDESi313**.

</div>
