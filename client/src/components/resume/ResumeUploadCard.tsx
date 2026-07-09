import { useRef } from 'react';

import {
  Loader2,
  UploadCloud,
} from 'lucide-react';

import { useResumeUpload } from '@/hooks/useResumeUpload';
import { useResumeStore } from '@/store/resume.store';

function ResumeUploadCard() {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const {
    uploadResume,
    uploading,
    progress,
    error,
  } = useResumeUpload();

  const triggerRefresh =
    useResumeStore(
      (state) => state.triggerRefresh,
    );

  async function handleFile(
    file: File | null,
  ) {
    if (!file) {
      return;
    }

    try {
      await uploadResume(file);

      triggerRefresh();

      alert(
        'Resume uploaded successfully.',
      );

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    } catch {
      // Error handled inside hook
    }
  }

  function openPicker() {
    inputRef.current?.click();
  }

  function handleDrop(
    e: React.DragEvent<HTMLDivElement>,
  ) {
    e.preventDefault();

    const file =
      e.dataTransfer.files[0];

    if (file) {
      void handleFile(file);
    }
  }

  function handleDragOver(
    e: React.DragEvent<HTMLDivElement>,
  ) {
    e.preventDefault();
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="rounded-2xl border-2 border-dashed border-border bg-card p-10 transition hover:border-primary/40 hover:bg-primary/5"
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        hidden
        onChange={(e) =>
          void handleFile(
            e.target.files?.[0] ?? null,
          )
        }
      />

      <div className="flex flex-col items-center text-center">
        <div className="mb-6 rounded-full bg-primary/10 p-5">
          <UploadCloud
            size={42}
            className="text-primary"
          />
        </div>

        <h2 className="text-2xl font-semibold">
          Upload your Resume
        </h2>

        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          Drag & drop your PDF here or click below
          to browse.
        </p>

        <button
          type="button"
          disabled={uploading}
          onClick={openPicker}
          className="mt-8 flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {uploading && (
            <Loader2
              size={18}
              className="animate-spin"
            />
          )}

          {uploading
            ? 'Uploading...'
            : 'Choose PDF'}
        </button>

        {uploading && (
          <div className="mt-6 w-full max-w-sm">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-all"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              {progress}% uploaded
            </p>
          </div>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-500">
            {error}
          </p>
        )}

        <p className="mt-6 text-xs text-muted-foreground">
          PDF only • Maximum size 10 MB
        </p>
      </div>
    </div>
  );
}

export default ResumeUploadCard;
