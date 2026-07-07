import { Router } from 'express';

import { authMiddleware } from '../../../middleware/auth.middleware.js';
import { uploadResume } from '../controllers/resume.controller.js';
import upload from '../../../config/multer.js';

const router = Router();

/**
 * Resume Routes
 */

/**
 * POST /api/v1/resume/upload
 *
 * Protected Route
 * Accepts a single PDF file with the field name "resume".
 */
router.post(
  '/upload',
  authMiddleware,
  upload.single('resume'),
  uploadResume,
);

export default router;
