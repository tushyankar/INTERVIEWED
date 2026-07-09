import { Router } from 'express';

import authRoutes from '../modules/auth/routes/auth.routes.js';
import resumeRoutes from '../modules/resume/routes/resume.routes.js';
import interviewRoutes from '../modules/interview/routes/interview.routes.js';

const router = Router();

/**
 * -------------------------------------
 * Health Check
 * -------------------------------------
 */
router.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is running successfully.',
    timestamp: new Date().toISOString(),
  });
});

/**
 * -------------------------------------
 * API Routes
 * -------------------------------------
 */
router.use('/auth', authRoutes);

router.use('/resume', resumeRoutes);

router.use('/interviews', interviewRoutes);

export default router;