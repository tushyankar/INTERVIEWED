import fs from 'node:fs/promises';

import { ResumeStatus } from '@prisma/client';
import { PDFParse } from 'pdf-parse';

import { resumeAIService } from '../../ai/services/resume-ai.service.js';
import ApiError from '../../../utils/ApiError.js';

import {
  createResume,
  updateResumeAIAnalysis,
  updateResumeStatus,
} from '../repositories/resume.repository.js';

export interface UploadedResume {
  userId: string;
  file: Express.Multer.File;
}

export async function processResume({
  userId,
  file,
}: UploadedResume) {
  try {
    console.log('📄 Reading uploaded file...');

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

    void analyzeResumeInBackground(
      resume.id,
      extractedText,
    );

    return resume;
  } catch (error) {
    console.error(error);

    throw new ApiError(
      500,
      'Failed to process uploaded resume.',
    );
  }
}

async function analyzeResumeInBackground(
  resumeId: string,
  extractedText: string,
): Promise<void> {
  try {
    console.log('🚀 Background analysis started');

    await updateResumeStatus(
      resumeId,
      ResumeStatus.PROCESSING,
    );

    console.log('🟡 Status updated to PROCESSING');

    console.log('🤖 Calling Ollama...');

    const analysis =
      await resumeAIService.analyzeResume(
        extractedText,
      );

    console.log('✅ Ollama responded');

    await updateResumeAIAnalysis(
      resumeId,
      analysis,
    );

    console.log('✅ AI analysis saved');
  } catch (error) {
    console.error(
      '❌ Background AI analysis failed:',
      error,
    );

    await updateResumeStatus(
      resumeId,
      ResumeStatus.FAILED,
    );

    console.log('🔴 Status updated to FAILED');
  }
}