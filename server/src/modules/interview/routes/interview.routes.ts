import { Router } from 'express';

import { authMiddleware } from '../../../middleware/auth.middleware.js';

import {
  createInterview,
  deleteInterview,
  getInterview,
  getUserInterviews,
} from '../controllers/interview.controller.js';

import { createInterviewSchema } from '../validators/interview.validator.js';
import { validateRequest } from '../../../middleware/validateRequest.js';

const router = Router();

/**
 * ================================================================
 * All Interview Routes Require Authentication
 * ================================================================
 */
router.use(authMiddleware);

/**
 * ================================================================
 * Create AI Interview
 * ================================================================
 */
router.post(
  '/',
  validateRequest(createInterviewSchema),
  createInterview,
);

/**
 * ================================================================
 * Get All User Interviews
 * ================================================================
 */
router.get(
  '/',
  getUserInterviews,
);

/**
 * ================================================================
 * Get Single Interview
 * ================================================================
 */
router.get(
  '/:id',
  getInterview,
);

/**
 * ================================================================
 * Delete Interview
 * ================================================================
 */
router.delete(
  '/:id',
  deleteInterview,
);

export default router;