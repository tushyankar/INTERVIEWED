import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import routes from './routes/index.js';
import { errorMiddleware } from './middleware/error.middleware.js';

const app = express();

/**
 * ============================================================
 * Security Middleware
 * ============================================================
 */
app.use(
  helmet({
    frameguard: false,
    contentSecurityPolicy: false,
  }),
);

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

/**
 * ============================================================
 * Request Parsers
 * ============================================================
 */
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(cookieParser());

/**
 * ============================================================
 * API Routes
 * ============================================================
 */
app.use('/api/v1', routes);

/**
 * ============================================================
 * Global Error Handler
 * Keep this LAST.
 * ============================================================
 */
app.use(errorMiddleware);

export default app;
