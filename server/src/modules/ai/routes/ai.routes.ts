import { Router } from 'express';

import { testGemini } from '../controllers/ai.controller.js';

const router = Router();

/**
 * =====================================================
 * AI Routes
 * =====================================================
 */

router.get('/test', testGemini);

export default router;
