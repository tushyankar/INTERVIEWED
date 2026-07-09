import fs from 'node:fs/promises';

import { ResumeStatus } from '@prisma/client';
import { PDFParse } from 'pdf-parse';

import ApiError from '../../../utils/ApiError.js';

import { resumeAIService } from '../../ai/services/resume-ai.service.js';

import {
  createResume,
  updateResumeAIAnalysis,
  updateResumeStatus,
} from '../repositories/resume.repository.js';

export interface UploadedResume {
  userId: string;
  file: Express.Multer.File;
}

/**
 * ============================================================
 * Upload Resume
 * ============================================================
 */
export async function processResume({
  userId,
  file,
}: UploadedResume) {
  try {
    console.log('📄 Reading uploaded resume...');

    const buffer = await fs.readFile(file.path);

    const parser = new PDFParse({
      data: buffer,
    });

    const parsed = await parser.getText();

    await parser.destroy();

    const extractedText = parsed.text
      .replace(/\0/g, '')
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .trim();

    console.log('📄 Creating resume record...');

    const resume = await createResume({
      userId,
      originalName: file.originalname,
      filename: file.filename,
      mimeType: file.mimetype,
      size: file.size,
      extractedText,
    });

    console.log(`✅ Resume created: ${resume.id}`);

    /**
     * Fire-and-forget AI analysis.
     */
    void analyzeResumeInBackground(
      resume.id,
      extractedText,
    );

    return resume;
  } catch (error) {
    console.error(
      '❌ Resume processing failed:',
      error,
    );

    throw new ApiError(
      500,
      'Failed to process uploaded resume.',
    );
  }
}

/**
 * ============================================================
 * Background Resume Intelligence
 * ============================================================
 */
async function analyzeResumeInBackground(
  resumeId: string,
  extractedText: string,
): Promise<void> {
  try {
    console.log(
      '🚀 Starting Gemini resume analysis...',
    );

    await updateResumeStatus(
      resumeId,
      ResumeStatus.PROCESSING,
    );

    console.log(
      '🟡 Resume status → PROCESSING',
    );

    /**
     * Call Gemini.
     */
    const analysis =
      await resumeAIService.analyzeResume(
        extractedText,
      );

    console.log(
      '✅ Gemini analysis completed.',
    );

    /**
     * Store AI analysis.
     *
     * Repository automatically marks
     * status = COMPLETED.
     */
    await updateResumeAIAnalysis(
      resumeId,
      analysis,
    );

    console.log(
      '🟢 Resume status → COMPLETED',
    );

    console.log(
      '💾 Resume Intelligence saved.',
    );
  } catch (error) {
    console.error(
      '❌ Gemini analysis failed:',
      error,
    );

    await updateResumeStatus(
      resumeId,
      ResumeStatus.FAILED,
    );

    console.log(
      '🔴 Resume status → FAILED',
    );
  }
}