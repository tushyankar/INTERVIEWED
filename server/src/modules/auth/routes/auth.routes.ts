import { Router } from 'express';

import { signup } from '../controllers/auth.controller.js';

const router = Router();

/**
 * POST /api/v1/auth/register
 */
router.post('/register', signup);

export default router;