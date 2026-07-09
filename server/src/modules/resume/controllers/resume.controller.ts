import fs from 'node:fs/promises';

import type { Request, Response } from 'express';

import { asyncHandler } from '../../../utils/asyncHandler.js';
import ApiError from '../../../utils/ApiError.js';

import { processResume } from '../services/resume.service.js';

import {
  clearActiveResume,
  deleteResume,
  findAllResumesByUserId,
  findResumeById,
  setActiveResume,
} from '../repositories/resume.repository.js';

/**
 * ================================================================
 * Upload Resume
 * ================================================================
 */

export const uploadResume = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.file) {
      throw new ApiError(
        400,
        'Resume file is required.',
      );
    }

    const resume = await processResume({
      userId: req.user!.id,
      file: req.file,
    });

    return res.status(201).json({
      success: true,
      message: 'Resume uploaded successfully.',
      data: resume,
    });
  },
);

/**
 * ================================================================
 * Get User Resumes
 * ================================================================
 */

export const getUserResumes = asyncHandler(
  async (req: Request, res: Response) => {
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

export const getResume = asyncHandler(
  async (req: Request, res: Response) => {
    const resume =
      await findResumeById(
        String(req.params.id),
      );

    if (
      !resume ||
      resume.userId !== req.user!.id
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
 * Preview Resume
 * ================================================================
 */

export const previewResumeController =
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
        resume.userId !== req.user!.id
      ) {
        throw new ApiError(
          404,
          'Resume not found.',
        );
      }

      await fs.access(resume.filePath);

      res.setHeader(
        'Content-Type',
        'application/pdf',
      );

      res.setHeader(
        'Content-Disposition',
        'inline',
      );

      return res.sendFile(
        resume.filePath,
      );
    },
  );

/**
 * ================================================================
 * Download Resume
 * ================================================================
 */

export const downloadResumeController =
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
        resume.userId !== req.user!.id
      ) {
        throw new ApiError(
          404,
          'Resume not found.',
        );
      }

      await fs.access(resume.filePath);

      return res.download(
        resume.filePath,
        resume.originalName,
      );
    },
  );

/**
 * ================================================================
 * Set Active Resume
 * ================================================================
 */

export const setActiveResumeController =
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
        resume.userId !== req.user!.id
      ) {
        throw new ApiError(
          404,
          'Resume not found.',
        );
      }

      await clearActiveResume(
        req.user!.id,
      );

      const activeResume =
        await setActiveResume(
          resume.id,
        );

      return res.status(200).json({
        success: true,
        message:
          'Active resume updated successfully.',
        data: activeResume,
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
        resume.userId !== req.user!.id
      ) {
        throw new ApiError(
          404,
          'Resume not found.',
        );
      }

      try {
        await fs.unlink(
          resume.filePath,
        );
      } catch (error) {
        console.warn(
          'Unable to delete file:',
          error,
        );
      }

      await deleteResume(
        resume.id,
      );

      return res.status(200).json({
        success: true,
        message:
          'Resume deleted successfully.',
      });
    },
  );
