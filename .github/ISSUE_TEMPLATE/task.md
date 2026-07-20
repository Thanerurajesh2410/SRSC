# Sri Rama Temple Management System (SRTMS)

Enterprise-grade temple management platform: donations, expenses, festivals,
volunteers, committee management, receipts, WhatsApp announcements, reports,
and a public financial-transparency dashboard. Built multi-tenant-ready,
starting with a single temple.

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind, shadcn/ui, React Hook Form + Zod, TanStack Query |
| Backend | Node.js, Express, TypeScript, Prisma ORM |
| Database | PostgreSQL |
| Auth | JWT (access + refresh), bcrypt, RBAC |
| Storage | Cloudinary |
| Notifications | WhatsApp, Email, SMS (future) |
| Deploy | Docker, GitHub Actions, Vercel (web), Railway/Render (api) |

## Monorepo Layout

```
apps/
  web/        Next.js frontend (public site + admin portal)
  api/        Express API (REST, Prisma, auth, business logic)
packages/
  ui/         Shared shadcn-based component library
  types/      Shared TypeScript types/enums (kept in sync with Prisma)
  utils/      Shared pure utility functions
  config/     Shared Tailwind/lint config
database/     Seed data, one-off scripts
docs/         Architecture & module planning docs
docker/       Local volume mounts (gitignored data)
.github/      CI workflows
```

## Getting Started

### Prerequisites
- Node.js >= 20
- Docker (for local Postgres) or a local PostgreSQL 16 instance
- npm >= 10

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# fill in DATABASE_URL, JWT secrets, Cloudinary, SMTP, WhatsApp credentials
```

### 3. Start Postgres
```bash
docker compose up -d postgres
```

### 4. Set up the database
```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### 5. Run the apps
```bash
npm run dev          # runs api (:4000) and web (:3000) together
# or individually:
npm run dev:api
npm run dev:web
```

API health check: `GET http://localhost:4000/api/v1/health`

### Full stack via Docker
```bash
docker compose up --build
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Run api + web in watch mode |
| `npm run build` | Build both apps |
| `npm run lint` | Lint all workspaces |
| `npm run test` | Unit/integration tests (Jest) |
| `npm run test:e2e` | Playwright E2E tests |
| `npm run prisma:studio` | Browse the database visually |

## Roles

`SUPER_ADMIN`, `TEMPLE_ADMIN`, `TREASURER`, `COMMITTEE_MEMBER`, `VOLUNTEER`,
`PUBLIC_USER`, `AUDITOR` (read-only). Permissions are role-based and
configurable per module (see `docs/ARCHITECTURE.md`).

## Build Plan

See `docs/MODULE_PLAN.md` — the system is generated module-by-module,
phase-by-phase (Phase 1: setup, auth, dashboard, committee → Phase 4: public
site, transparency dashboard, deployment), each phase shipping complete,
tested, integrated functionality before the next begins.
