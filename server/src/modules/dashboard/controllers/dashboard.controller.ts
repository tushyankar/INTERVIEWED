import type { Request, Response } from 'express';

import { asyncHandler } from '../../../utils/asyncHandler.js';

import {
  getDashboardService,
} from '../services/dashboard.service.js';

/**
 * ================================================================
 * Dashboard Controller
 * ================================================================
 */

export const getDashboard = asyncHandler(
  async (
    req: Request,
    res: Response,
  ) => {
    const dashboard =
      await getDashboardService(
        req.user!.id,
      );

    return res.status(200).json({
      success: true,
      data: dashboard,
    });
  },
);
