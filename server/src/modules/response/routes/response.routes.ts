import { Router } from 'express';

import { authMiddleware } from '../../../middleware/auth.middleware.js';

import {
  submitResponse,
  getInterviewResponses,
} from '../controllers/response.controller.js';

const router = Router();

/**
 * ================================================================
 * All Response Routes Require Authentication
 * ================================================================
 */

router.use(authMiddleware);

/**
 * ================================================================
 * Submit / Update Response
 * ================================================================
 *
 * POST /responses/question/:questionId
 */
router.post(
  '/question/:questionId',
  submitResponse,
);

/**
 * ================================================================
 * Get All Responses For An Interview
 * ================================================================
 *
 * GET /responses/interview/:interviewId
 */
router.get(
  '/interview/:interviewId',
  getInterviewResponses,
);

export default router;
