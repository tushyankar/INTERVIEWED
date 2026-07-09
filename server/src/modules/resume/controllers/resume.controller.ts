import type { Request, Response } from 'express';

import { asyncHandler } from '../../../utils/asyncHandler.js';

import {
  processResume,
} from '../services/resume.service.js';

import {
  deleteResume,
  findAllResumesByUserId,
  findResumeById,
} from '../repositories/resume.repository.js';

import ApiError from '../../../utils/ApiError.js';

/**
 * ================================================================
 * Upload Resume
 * ================================================================
 */

export const uploadResume = asyncHandler(
  async (
    req: Request,
    res: Response,
  ) => {
    if (!req.file) {
      throw new ApiError(
        400,
        'Resume file is required.',
      );
    }

    const resume =
      await processResume({
        userId: req.user!.id,
        file: req.file,
      });

    return res.status(201).json({
      success: true,
      message:
        'Resume uploaded successfully.',
      data: resume,
    });
  },
);

/**
 * ================================================================
 * Get User Resumes
 * ================================================================
 */

export const getUserResumes =
  asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const resumes =
        await findAllResumesByUserId(
          req.user!.id,
        );

      return res.status(200).json({
        success: true,
        data: resumes,
      });
    },
  );

/**
 * ================================================================
 * Get Resume
 * ================================================================
 */

export const getResume =
  asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const resume =
        await findResumeById(
          String(req.params.id),
        );

      if (
        !resume ||
        resume.userId !==
          req.user!.id
      ) {
        throw new ApiError(
          404,
          'Resume not found.',
        );
      }

      return res.status(200).json({
        success: true,
        data: resume,
      });
    },
  );

/**
 * ================================================================
 * Delete Resume
 * ================================================================
 */

export const deleteResumeController =
  asyncHandler(
    async (
      req: Request,
      res: Response,
    ) => {
      const resume =
        await findResumeById(
          String(req.params.id),
        );

      if (
        !resume ||
        resume.userId !==
          req.user!.id
      ) {
        throw new ApiError(
          404,
          'Resume not found.',
        );
      }

      await deleteResume(resume.id);

      return res.status(200).json({
        success: true,
        message:
          'Resume deleted successfully.',
      });
    },
  );
