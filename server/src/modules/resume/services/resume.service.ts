import fs from 'node:fs/promises';

import { PDFParse } from 'pdf-parse';

import ApiError from '../../../utils/ApiError.js';
import { createResume } from '../repositories/resume.repository.js';

export interface UploadedResume {
  userId: string;
  file: Express.Multer.File;
}

export async function processResume({
  userId,
  file,
}: UploadedResume) {
  try {
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

    return await createResume({
      userId,
      originalName: file.originalname,
      filename: file.filename,
      mimeType: file.mimetype,
      size: file.size,
      extractedText,
    });
  } catch (error) {
    console.error('Resume processing failed:', error);

    throw new ApiError(500, 'Failed to process uploaded resume.');
  }
}
