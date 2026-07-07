import { Router } from 'express';

import authRoutes from '../modules/auth/routes/auth.routes.js';

const router = Router();

router.use('/auth', authRoutes);

router.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is running successfully.',
    timestamp: new Date().toISOString(),
  });
});

export default router;