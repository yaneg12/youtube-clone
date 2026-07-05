# youtube-clone

A local full-stack YouTube clone starter with:
- Next.js + TypeScript frontend in frontend/
- Node.js + Express + TypeScript backend in backend/
- PostgreSQL, Redis, and MinIO via Docker Compose

## Quick start

1. Copy the environment template:
   cp .env.example .env
2. Start infrastructure services:
   npm run docker:up
3. Install dependencies:
   npm install
4. Run everything locally:
   npm run dev

## Services
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MinIO Console: http://localhost:9001
- PostgreSQL: localhost:5432
- Redis: localhost:6379

## Useful commands
- npm run docker:up
- npm run docker:down
- npm run docker:logs
- npm run dev:frontend
- npm run dev:backend