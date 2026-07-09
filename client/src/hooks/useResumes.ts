import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { resumeService } from '@/services/resume/resume.service';
import { useResumeStore } from '@/store/resume.store';

import type { Resume } from '@/types/resume';

export function useResumes() {
  const [resumes, setResumes] =
    useState<Resume[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const refreshKey = useResumeStore(
    (state) => state.refreshKey,
  );

  const fetchResumes =
    useCallback(async () => {
      try {
        setLoading(true);
        setError('');

        const response =
          await resumeService.getAll();

        setResumes(response.data.data);
      } catch (err) {
        console.error(err);

        setError(
          'Failed to load resumes.',
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    void fetchResumes();
  }, [
    fetchResumes,
    refreshKey,
  ]);

  return {
    resumes,
    loading,
    error,
    refresh: fetchResumes,
  };
}
