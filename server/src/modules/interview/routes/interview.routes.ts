import { Router } from 'express';

import { authMiddleware } from '../../../middleware/auth.middleware.js';
import { validateRequest } from '../../../middleware/validateRequest.js';

import {
  createInterview,
  deleteInterview,
  finishInterview,
  getInterview,
  getUserInterviews,
  startInterview,
} from '../controllers/interview.controller.js';

import {
  createInterviewSchema,
} from '../validators/interview.validator.js';

const router = Router();

/**
 * ================================================================
 * Authentication
 * ================================================================
 */

router.use(authMiddleware);

/**
 * ================================================================
 * Interview CRUD
 * ================================================================
 */

router.post(
  '/',
  validateRequest(createInterviewSchema),
  createInterview,
);

router.post(
  '/:id/start',
  startInterview,
);

router.post(
  '/:id/finish',
  finishInterview,
);

router.get(
  '/',
  getUserInterviews,
);

router.get(
  '/:id',
  getInterview,
);

router.delete(
  '/:id',
  deleteInterview,
);

export default router;
