import { Router } from 'express';

import upload from '../../../config/multer.js';
import { authMiddleware } from '../../../middleware/auth.middleware.js';

import {
  deleteResumeController,
  downloadResumeController,
  getResume,
  getUserResumes,
  previewResumeController,
  setActiveResumeController,
  uploadResume,
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

router.get(
  '/:id/preview',
  previewResumeController,
);

router.get(
  '/:id/download',
  downloadResumeController,
);

router.patch(
  '/:id/activate',
  setActiveResumeController,
);

router.delete(
  '/:id',
  deleteResumeController,
);

export default router;
