# task-manager-backend

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/main.ts
```

This project was created using `bun init` in bun v1.2.16. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

# Full Stack Task Manager

A full-stack task management system built with:

- **Backend:** NestJS (with Bun), Drizzle ORM, PostgreSQL
- **Frontend:** React + Vite + Mantine UI
- **API Communication:** REST
- **Auth:** JWT-based login and protected routes
- **Database:** PostgreSQL (SQLite for local development)

---

## Local Setup Instructions

### Backend

```bash
cd backend
bun install
bun run db:push   # push schema to SQLite
bun run db:studio #bun run db:studio
bun run start     # start backend at http://localhost:3000

#Architecture Notes

#Key Decisions
✅ Drizzle ORM – Chosen for type-safety and migration-less schema push
✅ Bun + NestJS – Bun speeds up local dev and integrates smoothly
✅ TypeBox + Custom Validation Pipe – Used instead of class-validator for better performance and cleaner DTO validation
✅ React + Mantine – For modern and responsive UI components
✅ JWT Auth – Simple token-based flow for login-protected access
#What We'd Do with More Time
⏳ Add role-based access control (RBAC)
⏳ Switch from SQLite to Postgres in production
⏳ Add unit/integration tests (Jest)
⏳ Add E2E tests (Playwright or Cypress)
⏳ Improve error handling & client notifications
⏳ Implement pagination and sorting on task lists
#Assumptions Made
All users can create and access their own projects/tasks
We store tasks with status (todo, in_progress, done) and priority (low, medium, high)
Task filtering works via simple query params
SQLite used for simplicity in local dev
#Example API Calls

Login: POST /auth/login
Projects: GET /projects
Create Task: POST /tasks/projects/:projectId/tasks
Get Tasks: GET /tasks/projects/:projectId?status=todo&priority=high