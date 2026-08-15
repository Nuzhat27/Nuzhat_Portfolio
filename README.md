# Nuzhat Firdosh — MERN Portfolio

A fully functional **MERN portfolio**, rebuilt from the original static portfolio.

## What is dynamic?

- Portfolio content is loaded from MongoDB through Express REST APIs.
- Contact form stores messages in MongoDB instead of opening `mailto:`.
- GitHub profile/repository stats are fetched through the backend.
- Admin authentication uses JWT + bcrypt.
- Admin dashboard lets you view contact messages and manage projects/certifications.
- Dark/light theme is persisted in localStorage.
- Responsive React frontend with React Router.
- Resume download is served from the frontend public folder.

## Stack

**Frontend:** React, Vite, React Router, Axios, CSS  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs  
**External API:** GitHub REST API

## Setup

### 1. Backend

```bash
cd server
npm install
copy .env.example .env
npm run seed
npm run dev
```

On macOS/Linux:

```bash
cp .env.example .env
```

Update `.env` with your MongoDB URI and admin credentials.

### 2. Frontend

Open another terminal:

```bash
cd client
npm install
copy .env.example .env
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Environment variables

### server/.env

```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/portfolio
JWT_SECRET=replace_with_a_long_random_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change_this_password
# Optional: use a bcrypt hash instead of ADMIN_PASSWORD
# ADMIN_PASSWORD_HASH=$2b$12$...
CLIENT_ORIGIN=http://localhost:5173
GITHUB_USERNAME=Nuzhat27
```

### client/.env

```env
VITE_API_URL=http://localhost:5000/api
```

## Admin

Open:

`http://localhost:5173/admin/login`

Use the `ADMIN_EMAIL` and `ADMIN_PASSWORD` values from the backend `.env`. For production, you can replace `ADMIN_PASSWORD` with a bcrypt `ADMIN_PASSWORD_HASH`.

The admin area supports:

- Viewing submitted contact messages
- Adding/deleting projects
- Adding/deleting certifications

## Deployment

### Backend

Deploy `server` to Render/Railway/Fly.io and add the same environment variables.

### Frontend

Deploy `client` to Vercel and set:

```env
VITE_API_URL=https://YOUR-BACKEND-DOMAIN/api
```

Then update backend:

```env
CLIENT_ORIGIN=https://YOUR-FRONTEND-DOMAIN
```
