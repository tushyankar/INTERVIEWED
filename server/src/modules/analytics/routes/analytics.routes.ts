import { Router } from 'express';

import { authMiddleware } from '../../../middleware/auth.middleware.js';

import {
  getUserAnalytics,
} from '../controllers/analytics.controller.js';

const router = Router();

/**
 * ================================================================
 * Analytics Routes
 * ================================================================
 */

router.use(authMiddleware);

/**
 * GET /api/v1/analytics
 */
router.get(
  '/',
  getUserAnalytics,
);

export default router;
