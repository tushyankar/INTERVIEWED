import { Router } from 'express';

import { authMiddleware } from '../../../middleware/auth.middleware.js';
import upload from '../../../config/multer.js';

import {
  uploadResume,
  getUserResumes,
  getResume,
  deleteResumeController,
} from '../controllers/resume.controller.js';

const router = Router();

/**
 * ================================================================
 * Authentication
 * ================================================================
 */

router.use(authMiddleware);

/**
 * ================================================================
 * Resume Routes
 * ================================================================
 */

router.post(
  '/upload',
  upload.single('resume'),
  uploadResume,
);

router.get(
  '/',
  getUserResumes,
);

router.get(
  '/:id',
  getResume,
);

router.delete(
  '/:id',
  deleteResumeController,
);

export default router;
