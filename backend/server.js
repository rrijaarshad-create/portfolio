// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const path = require('path');
// const fs = require('fs');
// const connectDB = require('./config/db');

// // Connect to MongoDB
// connectDB();

// const app = express();

// // ─── Security Middleware ───────────────────────────────────────
// app.use(helmet());

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin) return callback(null, true);

//     const allowed = [
//       'http://localhost:3000',
//       process.env.CLIENT_URL,
//     ].filter(Boolean);

//     // Accept any preview URL from this Vercel project automatically,
//     // instead of chasing the random string that changes every deploy.
//     const isVercelPreview = /^https:\/\/portfolio1[a-z0-9-]*\.vercel\.app$/.test(origin);

//     if (allowed.includes(origin) || isVercelPreview) {
//       return callback(null, true);
//     }
//     callback(new Error('Not allowed by CORS'));
//   },
//   credentials: true,
// }));
// app.set('trust proxy', 1); // trust first proxy
// // Rate limiting — max 100 requests per 15 minutes per IP
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   validate: { xForwardedForHeader: false } // disables the warning
// });
// app.use('/api/', limiter);

// // Stricter rate limit for contact form (5 per hour)
// const contactLimiter = rateLimit({
//   windowMs: 60 * 60 * 1000,
//   max: 5,
//   message: { message: 'Too many contact requests. Please try again in an hour.' },
// });

// // ─── Body Parsing ──────────────────────────────────────────────
// app.use(express.json({ limit: '10kb' }));
// app.use(express.urlencoded({ extended: true }));

// // ─── API Routes ────────────────────────────────────────────────
// app.use('/api/projects', require('./routes/projects'));
// app.use('/api/contact', contactLimiter, require('./routes/contact'));
// app.use('/api/testimonials', require('./routes/testimonials'));

// // Health check
// app.get('/api/health', (req, res) => {
//   res.json({ status: 'OK', timestamp: new Date().toISOString() });
// });

// // ─── Serve React Frontend (only if built into this same deployment) ───
// // If you deploy frontend and backend separately (e.g. frontend on Vercel,
// // backend on Railway), the build folder won't exist here — skip cleanly
// // instead of crashing on every non-API request.
// const frontendBuildPath = path.join(__dirname, '../frontend/build');
// if (process.env.NODE_ENV === 'production' && fs.existsSync(path.join(frontendBuildPath, 'index.html'))) {
//   app.use(express.static(frontendBuildPath));
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(frontendBuildPath, 'index.html'));
//   });
// } else {
//   app.get('/', (req, res) => {
//     res.json({ message: 'Portfolio API is running.' });
//   });
// }

// // ─── 404 Handler ──────────────────────────────────────────────
// app.use((req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// // ─── Global Error Handler ─────────────────────────────────────
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Internal server error' });
// });

// // ─── Start Server ─────────────────────────────────────────────
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
// });
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');

const connectDB = require('./config/db');

// ─── Connect to MongoDB ───────────────────────────────────────
connectDB();

const app = express();

// ─── Trust Railway Proxy ──────────────────────────────────────
app.set('trust proxy', 1);

// ─── Security Middleware ──────────────────────────────────────
app.use(helmet());

// ─── CORS Configuration ───────────────────────────────────────
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      console.log('🌐 Request Origin:', origin);

      // Allow requests without origin
      // Example: Postman, Railway health checks
      if (!origin) {
        return callback(null, true);
      }

      // Allow Vercel portfolio preview deployments
      const isVercelApp =
        origin.startsWith('https://portfolio1-') &&
        origin.endsWith('.vercel.app');

      if (allowedOrigins.includes(origin) || isVercelApp) {
        console.log('✅ CORS ALLOWED:', origin);
        return callback(null, true);
      }

      console.log('❌ CORS BLOCKED:', origin);

      return callback(
        new Error(`CORS blocked origin: ${origin}`)
      );
    },

    credentials: true,

    methods: [
      'GET',
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
      'OPTIONS',
    ],

    allowedHeaders: [
      'Content-Type',
      'Authorization',
    ],
  })
);

// ─── Body Parsing ──────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Rate Limiting ─────────────────────────────────────────────

// Max 100 API requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  validate: {
    xForwardedForHeader: false,
  },
});

app.use('/api/', limiter);

// Contact form: maximum 5 requests per hour
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,

  message: {
    message:
      'Too many contact requests. Please try again in an hour.',
  },
});

// ─── API Routes ────────────────────────────────────────────────
app.use(
  '/api/projects',
  require('./routes/projects')
);

app.use(
  '/api/contact',
  contactLimiter,
  require('./routes/contact')
);

app.use(
  '/api/testimonials',
  require('./routes/testimonials')
);

// ─── Health Check ──────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
  });
});

// ─── Serve React Frontend ──────────────────────────────────────
const frontendBuildPath = path.join(
  __dirname,
  '../frontend/build'
);

const frontendIndexPath = path.join(
  frontendBuildPath,
  'index.html'
);

if (
  process.env.NODE_ENV === 'production' &&
  fs.existsSync(frontendIndexPath)
) {
  app.use(express.static(frontendBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(frontendIndexPath);
  });
} else {
  app.get('/', (req, res) => {
    res.json({
      message: 'Portfolio API is running.',
    });
  });
}

// ─── 404 Handler ───────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

// ─── Global Error Handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('🔥 SERVER ERROR:', err.stack);

  res.status(500).json({
    message: 'Internal server error',
  });
});

// ─── Start Server ─────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);

  console.log(
    `🌍 Environment: ${
      process.env.NODE_ENV || 'development'
    }`
  );

  console.log(
    '🔗 CLIENT_URL:',
    process.env.CLIENT_URL
  );
});