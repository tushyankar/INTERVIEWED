import { Router } from 'express';

import authRoutes from '../modules/auth/routes/auth.routes.js';
import resumeRoutes from '../modules/resume/routes/resume.routes.js';
import interviewRoutes from '../modules/interview/routes/interview.routes.js';
import responseRoutes from '../modules/response/routes/response.routes.js';
import analyticsRoutes from '../modules/analytics/routes/analytics.routes.js';
import dashboardRoutes from '../modules/dashboard/routes/dashboard.routes.js';
import aiRoutes from '../modules/ai/routes/ai.routes.js';

const router = Router();

/**
 * ----------------------------------------------------
 * Health Check
 * ----------------------------------------------------
 */

router.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is running successfully.',
    timestamp: new Date().toISOString(),
  });
});

/**
 * ----------------------------------------------------
 * API Routes
 * ----------------------------------------------------
 */

router.use('/auth', authRoutes);

router.use('/resume', resumeRoutes);

router.use('/interviews', interviewRoutes);

router.use('/responses', responseRoutes);

router.use('/analytics', analyticsRoutes);

router.use('/dashboard', dashboardRoutes);

router.use('/ai', aiRoutes);

export default router;
