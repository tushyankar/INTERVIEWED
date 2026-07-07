import { Router } from 'express';

import {
  login,
  logout,
  refreshToken,
  signup,
} from '../controllers/auth.controller.js';

const router = Router();

/**
 * Authentication Routes
 */

// Register
router.post('/register', signup);

// Login
router.post('/login', login);

// Refresh Access Token
router.post('/refresh', refreshToken);

// Logout
router.post('/logout', logout);

export default router;
