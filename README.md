# 🔥 Full-Stack Portfolio Website

A stunning, warm-toned portfolio built with **React + TypeScript** frontend and **Node.js + Express + MongoDB** backend.

---

## 📁 Project Structure

```
portfolio/
├── frontend/          ← React + TypeScript (your website UI)
│   ├── src/
│   │   ├── components/   (Navbar, Footer)
│   │   ├── pages/        (Home, About, Skills, Projects, Contact)
│   │   ├── types/        (TypeScript interfaces)
│   │   └── index.css     (Global amber theme)
│   └── package.json
├── backend/           ← Node.js + Express + MongoDB
│   ├── config/db.js      (MongoDB connection)
│   ├── models/           (Project, Contact, Testimonial)
│   ├── routes/           (API endpoints)
│   ├── server.js         (Main entry point)
│   └── .env.example      (Copy to .env and fill in)
└── package.json       (Root — runs both together)
```

---

## ✏️ FIRST: Personalize Your Portfolio

Before running, find and replace these placeholder values:

| File | What to change |
|------|----------------|
| `frontend/src/components/Navbar.tsx` | `YN` initials → your initials; `YourName` → your name |
| `frontend/src/components/Footer.tsx` | WhatsApp number, Instagram handle, GitHub, LinkedIn links |
| `frontend/src/pages/About.tsx` | Your real education, university names, certifications |
| `frontend/src/pages/Skills.tsx` | Your actual skills and percentage levels |
| `frontend/src/pages/Projects.tsx` | Your real projects (or add via API) |
| `frontend/src/pages/Contact.tsx` | Your real email and WhatsApp number |
| `backend/.env` | MongoDB URI, your Gmail credentials |

---

## 🚀 Setup & Run Locally

### Step 1: Install all dependencies
```bash
cd portfolio
npm install
cd frontend && npm install
cd ../backend && npm install
```

### Step 2: Configure environment variables
```bash
cd backend
cp .env.example .env
# Now open .env and fill in your MongoDB URI and email
```

### Step 3: Run the app (both frontend + backend)
```bash
# From the portfolio/ root folder:
npx concurrently "cd backend && npx nodemon server.js" "cd frontend && npm start"
```

Or in two separate terminals:
```bash
# Terminal 1 (backend):
cd portfolio/backend
node server.js        # or: npx nodemon server.js

# Terminal 2 (frontend):
cd portfolio/frontend
npm start
```

Your site opens at: **http://localhost:3000**
Backend API runs at: **http://localhost:5000**

---

## 🔌 API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/projects` | Get all projects |
| POST | `/api/projects` | Add a new project |
| PUT | `/api/projects/:id` | Update a project |
| DELETE | `/api/projects/:id` | Delete a project |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact` | View all messages |
| GET | `/api/testimonials` | Get testimonials |
| POST | `/api/testimonials` | Add testimonial |

### Example: Add a project via API (using curl or Postman)
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My E-Commerce App",
    "description": "Built with React and Node.js",
    "techStack": ["React", "Node.js", "MongoDB"],
    "liveUrl": "https://myapp.vercel.app",
    "githubUrl": "https://github.com/you/myapp",
    "featured": true
  }'
```

---

## 🔗 Linking Your Laptop Projects to Your Website

When you build a project on your laptop and want to show it:

### Option A: Link GitHub repo (Recommended)
1. Push your project to GitHub: `git push origin main`
2. In Postman or curl, POST to `/api/projects` with your `githubUrl`
3. It shows automatically on your Projects page ✅

### Option B: Deploy project and link live URL
1. Deploy on **Vercel** (free): go to vercel.com → import GitHub repo → deploy
2. Copy the `https://yourapp.vercel.app` URL
3. POST to `/api/projects` with `liveUrl` — visitors can click "Live Demo" ✅

### Option C: Add screenshots
1. Take a screenshot of your project
2. Upload it to **Cloudinary** (free) or **imgbb.com**
3. Copy the image URL and add it as `imageUrl` in your project POST request

---

## 🌍 Deploying Live (So Anyone Can Visit)

### Frontend → Deploy on Vercel (Free, Best Option)

1. Push your whole project to GitHub
2. Go to **vercel.com** → Sign up free → "Add New Project"
3. Import your GitHub repo
4. Set root directory to `frontend`
5. Build command: `npm run build` | Output: `build`
6. Click **Deploy** → You get `https://yourname.vercel.app` 🎉

### Backend → Deploy on Render (Free)

1. Go to **render.com** → Sign up free → "New Web Service"
2. Connect your GitHub repo
3. Root directory: `backend`
4. Build command: `npm install`
5. Start command: `node server.js`
6. Add Environment Variables (from your `.env` file):
   - `MONGODB_URI` = your MongoDB Atlas connection string
   - `EMAIL_USER` = your Gmail
   - `EMAIL_PASS` = your Gmail App Password
   - `CLIENT_URL` = your Vercel frontend URL
   - `NODE_ENV` = production
7. Click **Deploy** → Get `https://yourname-api.onrender.com`

### After deploying both:
- The `"proxy"` field in `frontend/package.json` only works during local dev (`npm start`) — it does nothing in a production build, so don't edit it for deployment.
- Instead, in your **Vercel project settings → Environment Variables**, add:
  - `REACT_APP_API_URL` = your Render backend URL (e.g. `https://yourname-api.onrender.com`)
- Redeploy the frontend on Vercel so the new env var gets baked into the build.
- On Render, set `CLIENT_URL` to your Vercel frontend URL so CORS allows it.

### MongoDB → MongoDB Atlas (Free Cloud Database)

1. Go to **mongodb.com/atlas** → Sign up free
2. Create a cluster (M0 free tier)
3. Create a database user with password
4. Get the connection string: `mongodb+srv://user:pass@cluster.mongodb.net/portfolio`
5. Paste into your `MONGODB_URI` env variable

---

## 📧 Gmail App Password Setup

To send emails from contact form:
1. Go to Google Account → Security → 2-Step Verification → ON
2. Then: Google Account → Security → App Passwords
3. Create an app password for "Mail"
4. Use that 16-character code as `EMAIL_PASS` in your `.env`

---

## 🎨 Customization Quick Guide

### Add your photo (About page)
In `frontend/src/pages/About.tsx`, find the placeholder div with `👨‍💻` and replace:
```jsx
<img
  src="/photo.jpg"
  alt="Your Name"
  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16 }}
/>
```
Put `photo.jpg` in `frontend/public/`

### Add your real resume
Put your resume PDF as `frontend/public/resume.pdf`
The "Download Resume" button will automatically work.

### Change your name everywhere
Search for placeholder text like `yourusername`, `yourprofile`, or `TODO` comments in `Footer.tsx` and `Projects.tsx` and replace with your real links.

---

## 🛡️ Security Notes (Before Going Live)

- Add authentication (JWT) to protect POST/DELETE routes on projects API
- Never commit your `.env` file — add it to `.gitignore` ✅ 
- The contact form already has rate limiting (5 per hour per IP)

---

Built with ❤️ using React, TypeScript, Node.js, Express, and MongoDB.
