import { Router } from 'express';

import { authMiddleware } from '../../../middleware/auth.middleware.js';

import {
  createInterview,
  deleteInterview,
  getInterview,
  getUserInterviews,
} from '../controllers/interview.controller.js';

const router = Router();

/**
 * ----------------------------------------
 * Protected Routes
 * ----------------------------------------
 */

router.use(authMiddleware);

/**
 * ----------------------------------------
 * Interview Routes
 * ----------------------------------------
 */

router.post('/', createInterview);

router.get('/', getUserInterviews);

router.get('/:id', getInterview);

router.delete('/:id', deleteInterview);

export default router;