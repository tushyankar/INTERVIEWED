import {
  FileSearch,
  UploadCloud,
} from 'lucide-react';

function ResumeEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-card px-8 py-20 text-center">
      <div className="rounded-full bg-primary/10 p-6">
        <FileSearch
          size={48}
          className="text-primary"
        />
      </div>

      <h2 className="mt-6 text-3xl font-bold">
        Your Resume Library is Empty
      </h2>

      <p className="mt-4 max-w-lg text-muted-foreground">
        Upload your first resume to unlock AI-powered
        interview generation, ATS analysis, resume
        scoring and personalized improvement
        suggestions.
      </p>

      <div className="mt-8 flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-primary-foreground">
        <UploadCloud size={18} />
        Upload your first resume
      </div>
    </div>
  );
}

export default ResumeEmptyState;
