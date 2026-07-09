import { X } from 'lucide-react';

interface ResumeViewerProps {
  open: boolean;
  title: string;
  url: string | null;
  onClose: () => void;
}

function ResumeViewer({
  open,
  title,
  url,
  onClose,
}: ResumeViewerProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
      <div className="flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="truncate text-xl font-semibold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-muted"
          >
            <X size={20} />
          </button>
        </div>

        {url ? (
          <iframe
            src={url}
            title={title}
            className="h-full w-full"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Unable to preview this resume.
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeViewer;
