# Nuzhat Firdosh — MERN Portfolio

A fully functional MERN (MongoDB, Express, React, Node.js) portfolio, rebuilt from the original static site. Content is served from a real database through a REST API, the contact form actually persists submissions, and an authenticated admin area manages projects and certifications.

**Live:** https://nuzhat-portfolio-seven.vercel.app/

---

## What's dynamic

- Portfolio content (projects, certifications, etc.) is loaded from MongoDB through Express REST APIs — not hardcoded in the frontend.
- The contact form stores messages in MongoDB instead of opening a `mailto:` link.
- GitHub profile and repository stats are fetched through the backend.
- Admin authentication uses JWT + bcrypt.
- An admin dashboard lets you view contact messages and manage projects/certifications.
- Dark/light theme preference is persisted in `localStorage`.
- Responsive React frontend with client-side routing (React Router).
- Resume download is served as a static file from the frontend's public folder.

## Stack

| Layer | Tech |
|---|---|
| Frontend | React, Vite, React Router, Axios, CSS |
| Backend | Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs |
| External | GitHub REST API |
| Deployment | Frontend on Vercel · Backend on Render/Railway/Fly.io |

## Project structure

```
portfolio-mern/
  server/     Express + Mongoose API, JWT admin auth
  client/     React (Vite) frontend
```

---

## Local setup

### 1. Backend

```bash
cd server
npm install
cp .env.example .env      # Windows: copy .env.example .env
```

Fill in `server/.env` with your MongoDB URI and admin credentials (see [Environment variables](#environment-variables) below), then:

```bash
npm run seed   # populates projects/certifications from seed data
npm run dev    # starts the API, default http://localhost:5000
```

### 2. Frontend

In a second terminal:

```bash
cd client
npm install
cp .env.example .env      # Windows: copy .env.example .env
npm run dev
```

The frontend runs at `http://localhost:5173`.

---

## Environment variables

### `server/.env`

```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/portfolio
JWT_SECRET=replace_with_a_long_random_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change_this_password
# Optional: use a bcrypt hash instead of a plaintext password
# ADMIN_PASSWORD_HASH=$2b$12$...
CLIENT_ORIGIN=http://localhost:5173
GITHUB_USERNAME=Nuzhat27
```

### `client/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Admin

Open `http://localhost:5173/admin/login` and sign in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` set in the backend `.env`. For production, prefer setting `ADMIN_PASSWORD_HASH` (a bcrypt hash) instead of a plaintext `ADMIN_PASSWORD`.

The admin area supports:

- Viewing submitted contact messages
- Adding and deleting projects
- Adding and deleting certifications

---

## Deployment

**Backend** — deploy `server/` to Render, Railway, or Fly.io, and set the same environment variables as `.env` on the host.

**Frontend** — deploy `client/` to Vercel (currently live at [nuzhat-portfolio-seven.vercel.app](https://nuzhat-portfolio-seven.vercel.app/)) and set:

```env
VITE_API_URL=https://YOUR-BACKEND-DOMAIN/api
```

Then update the backend's env var to match:

```env
CLIENT_ORIGIN=https://YOUR-FRONTEND-DOMAIN
```

> **Note:** if the backend is hosted on a free tier (Render, etc.), it may take 30–60 seconds to wake up after a period of inactivity — the first request after idle will be slow.

---

## License

Personal portfolio project. Feel free to reference the structure, but please don't republish the content as your own.
