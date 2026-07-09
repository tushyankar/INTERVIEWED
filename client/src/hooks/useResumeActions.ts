import { useState } from 'react';

import { resumeService } from '@/services/resume/resume.service';

interface ResumeActionsOptions {
  onSuccess?: () => void;
}

export function useResumeActions(
  options?: ResumeActionsOptions,
) {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  async function deleteResume(
    id: string,
  ) {
    try {
      setLoading(true);
      setError('');

      await resumeService.delete(id);

      options?.onSuccess?.();
    } catch (err) {
      console.error(err);

      setError(
        'Failed to delete resume.',
      );

      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function activateResume(
    id: string,
  ) {
    try {
      setLoading(true);
      setError('');

      await resumeService.setActive(id);

      options?.onSuccess?.();
    } catch (err) {
      console.error(err);

      setError(
        'Failed to activate resume.',
      );

      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function downloadResume(
    id: string,
    fileName: string,
  ) {
    try {
      setLoading(true);
      setError('');

      const response =
        await resumeService.download(id);

      const blob = new Blob([
        response.data,
      ]);

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement('a');

      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);

      setError(
        'Failed to download resume.',
      );

      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    deleteResume,
    activateResume,
    downloadResume,
  };
}
