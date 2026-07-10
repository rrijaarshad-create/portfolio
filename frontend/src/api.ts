import axios from 'axios';

// In local dev, requests to /api/* are proxied to http://localhost:5000
// (see the "proxy" field in package.json), so no base URL is needed.
//
// In production, the frontend and backend are usually deployed separately
// (e.g. frontend on Vercel, backend on Render). Set REACT_APP_API_URL in
// your hosting provider's environment variables to your backend's URL,
// e.g. https://your-backend.onrender.com — CRA bakes this in at build time.
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',
});

export default api;
