import type { Request, Response } from 'express';

import { asyncHandler } from '../../../utils/asyncHandler.js';

import {
  createInterviewService,
  deleteInterviewService,
  finishInterviewService,
  getInterviewService,
  getUserInterviewsService,
  startInterviewService,
} from '../services/interview.service.js';

import type {
  CreateInterviewRequest,
} from '../types/interview.types.js';

export const createInterview = asyncHandler(
  async (req: Request, res: Response) => {
    const body =
      req.body as CreateInterviewRequest;

    const interview =
      await createInterviewService({
        userId: req.user!.id,
        role: body.role,
        difficulty: body.difficulty,
      });

    return res.status(201).json({
      success: true,
      message:
        'Interview generated successfully.',
      data: interview,
    });
  },
);

export const startInterview = asyncHandler(
  async (req: Request, res: Response) => {
    const interview =
      await startInterviewService(
        String(req.params.id),
        req.user!.id,
      );

    return res.status(200).json({
      success: true,
      message:
        'Interview started successfully.',
      data: interview,
    });
  },
);

export const finishInterview = asyncHandler(
  async (req: Request, res: Response) => {
    const interview =
      await finishInterviewService(
        String(req.params.id),
        req.user!.id,
      );

    return res.status(200).json({
      success: true,
      message:
        'Interview completed successfully.',
      data: interview,
    });
  },
);

export const getInterview = asyncHandler(
  async (req: Request, res: Response) => {
    const interview =
      await getInterviewService(
        String(req.params.id),
        req.user!.id,
      );

    return res.status(200).json({
      success: true,
      data: interview,
    });
  },
);

export const getUserInterviews = asyncHandler(
  async (req: Request, res: Response) => {
    const interviews =
      await getUserInterviewsService(
        req.user!.id,
      );

    return res.status(200).json({
      success: true,
      data: interviews,
    });
  },
);

export const deleteInterview = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteInterviewService({
      interviewId: String(
        req.params.id,
      ),
      userId: req.user!.id,
    });

    return res.status(200).json({
      success: true,
      message:
        'Interview deleted successfully.',
    });
  },
);
