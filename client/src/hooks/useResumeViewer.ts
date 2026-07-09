import { useState } from 'react';

import { resumeService } from '@/services/resume/resume.service';

import type { Resume } from '@/types/resume';

export function useResumeViewer() {
  const [open, setOpen] = useState(false);

  const [selectedResume, setSelectedResume] =
    useState<Resume | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null);

  async function openViewer(
    resume: Resume,
  ) {
    try {
      const response =
        await resumeService.download(
          resume.id,
        );

      const blob = new Blob(
        [response.data],
        {
          type: 'application/pdf',
        },
      );

      const url =
        URL.createObjectURL(blob);

      setSelectedResume(resume);
      setPreviewUrl(url);
      setOpen(true);
    } catch (error) {
      console.error(error);

      alert(
        'Failed to preview resume.',
      );
    }
  }

  function closeViewer() {
    if (previewUrl) {
      URL.revokeObjectURL(
        previewUrl,
      );
    }

    setOpen(false);
    setSelectedResume(null);
    setPreviewUrl(null);
  }

  return {
    open,
    previewUrl,
    selectedResume,
    openViewer,
    closeViewer,
  };
}
