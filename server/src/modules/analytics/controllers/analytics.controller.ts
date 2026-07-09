import type { Request, Response } from 'express';

import { asyncHandler } from '../../../utils/asyncHandler.js';

import {
  getAnalytics,
} from '../services/analytics.service.js';

/**
 * ================================================================
 * Get User Analytics
 * ================================================================
 */

export const getUserAnalytics = asyncHandler(
  async (
    req: Request,
    res: Response,
  ) => {
    const analytics =
      await getAnalytics(
        req.user!.id,
      );

    return res.status(200).json({
      success: true,
      data: analytics,
    });
  },
);
