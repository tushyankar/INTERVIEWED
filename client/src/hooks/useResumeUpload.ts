import { useState } from 'react';

import { resumeService } from '@/services/resume/resume.service';

export function useResumeUpload() {
  const [uploading, setUploading] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const [error, setError] =
    useState('');

  async function uploadResume(
    file: File,
  ) {
    try {
      setUploading(true);
      setProgress(0);
      setError('');

      if (
        file.type !== 'application/pdf'
      ) {
        throw new Error(
          'Only PDF files are allowed.',
        );
      }

      if (
        file.size >
        10 * 1024 * 1024
      ) {
        throw new Error(
          'Maximum file size is 10 MB.',
        );
      }

      setProgress(20);

      const response =
        await resumeService.upload(file);

      setProgress(100);

      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          'Upload failed.',
        );
      }

      throw err;
    } finally {
      setUploading(false);
    }
  }

  return {
    uploading,
    progress,
    error,
    uploadResume,
  };
}
