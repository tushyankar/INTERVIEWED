import type { Request, Response } from 'express';

import { asyncHandler } from '../../../utils/asyncHandler.js';

import {
  submitResponseService,
  getInterviewResponsesService,
} from '../services/response.service.js';

import type {
  SubmitResponseRequest,
} from '../types/response.types.js';

/**
 * ================================================================
 * Submit Response
 * ================================================================
 */

export const submitResponse = asyncHandler(
  async (req: Request, res: Response) => {
    const body =
      req.body as SubmitResponseRequest;

    const response =
      await submitResponseService({
        questionId: String(
          req.params.questionId,
        ),
        transcript: body.transcript,
      });

    return res.status(201).json({
      success: true,
      message: 'Response saved successfully.',
      data: response,
    });
  },
);

/**
 * ================================================================
 * Get Interview Responses
 * ================================================================
 */

export const getInterviewResponses =
  asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const responses =
        await getInterviewResponsesService(
          String(req.params.interviewId),
        );

      return res.status(200).json({
        success: true,
        data: responses,
      });
    },
  );
