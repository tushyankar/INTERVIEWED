import type { NextFunction, Request, Response } from 'express';

import ApiError from '../../../utils/ApiError.js';
import { processResume } from '../services/resume.service.js';

export async function uploadResume(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Unauthorized.');
    }

    if (!req.file) {
      throw new ApiError(400, 'Resume PDF is required.');
    }

    const resume = await processResume({
      userId: req.user.id,
      file: req.file,
    });

    res.status(201).json({
      success: true,
      message: 'Resume uploaded and processed successfully.',
      data: {
        id: resume.id,
        userId: resume.userId,
        originalName: resume.originalName,
        filename: resume.filename,
        mimeType: resume.mimeType,
        size: resume.size,
        extractedText: resume.extractedText,
        skills: resume.skills,
        experienceYears: resume.experienceYears,
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
}
