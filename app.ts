import compression from 'compression';
import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import indexRouter from './routes/index.js'; // Add .js for ESM

dotenv.config();

const app = express();

// Dynamically import helmet and express-rate-limit
(async () => {
  const helmetModule = await import('helmet');
  const helmet = helmetModule.default;

  const rateLimitModule = await import('express-rate-limit');
  const rateLimit = rateLimitModule.default;

  // Apply Helmet for security
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: true,
    frameguard: { action: 'deny' },
    hsts: { maxAge: 31536000, includeSubDomains: true },
    noSniff: true
  }));

  // Rate limiting to prevent abuse
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100 // limit each IP to 100 requests per windowMs
  });
  app.use(limiter);
})();

// Use compression middleware to improve performance
app.use(compression({
  threshold: 1024 // Only compress files over 1KB
}));

// Set views directory and engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory with caching
app.use(express.static(path.join(__dirname, '../dist'), {
  maxAge: '1d',
  etag: false // Turn off ETag to avoid unnecessary revalidation
}));

// Routes
app.use('/', indexRouter);

// Error handling middleware
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(createError(404));
});

// Error handler
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {} // No stack trace in production
  });
});

export default app;