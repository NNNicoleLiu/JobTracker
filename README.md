# JobTracker

A full-stack web application for managing your job search pipeline — track applications, monitor status changes, and stay organised throughout your career journey.

🌐 **Live Demo**: [jobtracker.miagamestudio.com](https://jobtracker.miagamestudio.com)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [CI/CD Pipeline](#cicd-pipeline)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)

---

## Overview

JobTracker solves a common problem for job seekers — keeping track of dozens of applications across multiple companies, stages, and timelines. Instead of managing spreadsheets, users get a clean interface to log applications, update statuses in real time, and search across their entire pipeline.

The project is built with a production-grade architecture: a Dockerized Django REST API behind a Gunicorn WSGI server, a React SPA served via Nginx, PostgreSQL for persistence, and Google OAuth for frictionless authentication — all deployed to AWS EC2 through an automated GitHub Actions CI/CD pipeline.

---

## Features

- **Google OAuth** — one-click sign-in via Google, no password required
- **Full CRUD** — create, view, edit, and delete job applications
- **Status Tracking** — move applications through stages: Applied → Interview → Offer → Rejected
- **Search & Filter** — find applications instantly by company, role, or status
- **Secure by default** — JWT authentication, CORS protection, HTTPS enforced via Nginx

---

## Tech Stack

### Backend

| Technology                        | Purpose                              |
| --------------------------------- | ------------------------------------ |
| **Django**                        | REST API framework                   |
| **Django REST Framework**         | API serialization and authentication |
| **PostgreSQL 15**                 | Primary database                     |
| **Gunicorn**                      | Production WSGI server               |
| **django-allauth**                | Google OAuth integration             |
| **djangorestframework-simplejwt** | JWT token authentication             |
| **django-cors-headers**           | Cross-origin request handling        |

### Frontend

| Technology            | Purpose                             |
| --------------------- | ----------------------------------- |
| **React 18**          | UI framework                        |
| **JavaScript (ES6+)** | Primary language                    |
| **Vite**              | Build tool and dev server           |
| **Material UI (MUI)** | Component library and design system |

### Infrastructure

| Technology                  | Purpose                                             |
| --------------------------- | --------------------------------------------------- |
| **Docker & Docker Compose** | Containerisation and orchestration                  |
| **Nginx**                   | Reverse proxy, static file serving, SSL termination |
| **AWS EC2**                 | Cloud deployment                                    |
| **GitHub Actions**          | CI/CD pipeline                                      |
| **Playwright**              | End-to-end testing                                  |

---

## Architecture

```
                        Internet
                            │
                            ▼
                    ┌───────────────┐
                    │  AWS EC2      │
                    │               │
                    │  ┌─────────┐  │
                    │  │  Nginx  │  │  ← port 80 only
                    │  │ :80     │  │    SSL termination
                    │  └────┬────┘  │    static file serving
                    │       │       │    reverse proxy
                    │   ┌───┴───┐   │
                    │   │       │   │
                    │ React  Django │
                    │ dist/  :8000  │  ← internal Docker network
                    │        │      │    no external port access
                    │   ┌────┴───┐  │
                    │   │Postgres│  │  ← internal only
                    │   │ :5432  │  │    data persisted in volume
                    │   └────────┘  │
                    └───────────────┘
```

### Key Architecture Decisions

**Nginx as the single entry point** — only port 80 are exposed to the internet. Django (port 8000) and PostgreSQL (port 5432) are accessible only within the Docker network. Nginx routes requests by URL prefix: `/auth/` and `/jobs/` are proxied to Django, everything else is served as React static files.

**Multi-environment Docker Compose** — `docker-compose.dev.yml` runs the local dev stack with Django's built-in server and Vite hot-reload. `docker-compose.prod.yml` runs for production: Gunicorn replaces runserver, Nginx replaces the Vite dev server, and source-code bind-mounts are removed so the built image layer is used.

**Frontend built on CI runner, not EC2** — `npm run build` runs on the GitHub Actions runner (7GB RAM) and the compiled `dist/` folder is copied to EC2. The Nginx Dockerfile just copies pre-built files, keeping EC2 memory usage low and deploy times fast.

**JWT + Session authentication** — Google OAuth issues a session via django-allauth, which is then exchanged for a JWT access/refresh token pair. The frontend stores tokens in memory and attaches them to every API request via an Axios interceptor.

---

## CI/CD Pipeline

```
Push to main
      │
      ▼
┌─────────────────────────────────────────┐
│  GitHub Actions                         │
│                                         │
│  1. Run Playwright E2E tests (native)   │
│     ├── PostgreSQL via services: block  │
│     ├── Django runserver (background)   │
│     ├── Vite dev server (background)    │
│     └── Playwright test suite           │
│                                         │
│  2. Build frontend (on runner)          │
│     └── npm run build → dist/           │
│                                         │
│  3. Deploy to EC2 (on success)          │
│     ├── Copy files + dist/ via SCP      │
│     ├── Write .env.production from      │
│     │   GitHub Secrets                  │
│     └── docker compose up --build       │
└─────────────────────────────────────────┘
      │
      ▼
   EC2 starts:
   ├── PostgreSQL container
   ├── Django + Gunicorn (migrate + collectstatic on start)
   └── Nginx (serves React + proxies API)
```

### E2E Tests

Tests run natively on the GitHub Actions runner — no Docker involved — for maximum speed:

- PostgreSQL via the Actions `services:` block
- Django started as a background process
- Vite dev server started as a background process
- Playwright auth state saved once and reused across all browser projects (Chromium, Firefox, WebKit)

---

## Project Structure

```
jobtracker/
├── .github/
│   └── workflows/
│       ├── e2e-ci.yml          # Playwright E2E tests on every PR
│       └── deploy.yml          # Build and deploy to EC2 on merge to main
│
├── backend/                    # Django project
│   ├── JWT/
│   │   ├── settings.py         # Environment-aware settings (dev/prod)
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   ├── users/
│   │   ├── migrations/
│   │   ├── admin.py
│   │   ├── models.py           # Custom User model
│   │   ├── serializers.py
│   │   ├── views.py            # GoogleLogin view, profile endpoints
│   │   └── urls.py
│   ├── jobs/
│   │   ├── migrations/
│   │   ├── models.py           # Job application model
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── docs/
│   │   ├── api_documentation.md
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env.example            # template for required environment variables of backend
│   └── Dockerfile
│
├── frontend/                   # React + Vite project
│   ├── e2e/                    # Playwright specs
│   │   ├── .auth/
│   │   │   └── user.json       # saved auth state (git-ignored)
│   │   ├── auth.setup.ts       # login once, reuse session
│   │   └── jobs.spec.ts
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/              # api call function
│   │   ├── config.jsx
│   │   ├── app.jsx
│   │   └── main.jsx
│   ├── playwright.config.ts
│   ├── vite.config.ts          # dev proxy mirrors nginx routing
│   ├── .env.example            # template for required environment variables of frontend
│   ├── package.json
│   └── Dockerfile              # dev only — not used in production
│
├── nginx/
│   ├── Dockerfile              # copies pre-built dist/ into Nginx image
│   └── nginx.conf              # reverse proxy + static serving + security headers
│
├── docker-compose.yml          # base — shared by both environments
├── docker-compose.dev.yml      # local development overrides
├── docker-compose.prod.yml     # production overrides (Nginx, Gunicorn, no bind-mounts)
└── README.md
```

---

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for running Playwright tests locally)
- Python 3.11+ (for running Django natively)

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/NNNicoleLiu/JobTracker.git
cd jobtracker

# 2. Copy environment template and fill in values
cp backend/.env.example backend/.env.development
cp frontend/.env.example frontend/.env.development

# 3. Start the full stack
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

# Frontend → http://localhost:5173
# Backend  → http://localhost:8000
# Admin    → http://localhost:8000/admin
```

### Running E2E Tests Locally

```bash
# Start just the database
docker compose -f docker-compose.yml -f docker-compose.dev.yml up db

# In a separate terminal — start Django
cd backend
python manage.py migrate
python manage.py runserver

# In another terminal — start Vite
cd frontend
npm run dev

# Run Playwright
cd frontend
npx playwright test

# View the HTML report
npx playwright show-report
```

---

## Environment Variables

### Backend

Copy `.env.example` to `backend/.env.development` and fill in the values.

```env
# Django
DJANGO_ENV=development
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
POSTGRES_DB=jobtracker_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5173

```

### Frontend

Copy `.env.example` to `frontend/.env.development` and fill in the values.

```env
VITE_API_URL=http://0.0.0.0:8000
```

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project → APIs & Services → Credentials
3. Create OAuth 2.0 Client ID (Web application)
4. Add authorised origins: `http://localhost:5173`
5. Add authorised redirect URIs: `http://localhost:5173`
6. Copy Client ID and Secret into your `backend/.env.development`

---

## API Endpoints

All endpoints require JWT authentication except login/register.

### Auth

| Method | Endpoint         | Description        | Auth     |
| ------ | ---------------- | ------------------ | -------- |
| `POST` | `/auth/google/`  | Google OAuth login | Public   |
| `POST` | `/auth/logout/`  | Logout             | Required |
| `GET`  | `/auth/profile/` | Get current user   | Required |

### Jobs

| Method   | Endpoint     | Description           | Auth     |
| -------- | ------------ | --------------------- | -------- |
| `GET`    | `/jobs/`     | List all applications | Required |
| `POST`   | `/jobs/`     | Create application    | Required |
| `PUT`    | `/jobs/:id/` | Update application    | Required |
| `DELETE` | `/jobs/:id/` | Delete application    | Required |

### Job Status Values

```
applied     → Submitted application
interview   → Interview scheduled or completed
offer       → Received an offer
rejected    → Application rejected
rejected    → Application withdrawn
```
