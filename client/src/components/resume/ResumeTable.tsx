import {
  BadgeCheck,
  Download,
  Eye,
  Star,
  Trash2,
} from 'lucide-react';

import type { Resume } from '@/types/resume';

interface ResumeTableProps {
  resumes: Resume[];
  onDelete?: (id: string) => void;
  onActivate?: (id: string) => void;
  onView?: (resume: Resume) => void;
  onDownload?: (resume: Resume) => void;
}

function ResumeTable({
  resumes,
  onDelete,
  onActivate,
  onView,
  onDownload,
}: ResumeTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border">
      <table className="w-full">
        <thead className="border-b bg-muted/50">
          <tr>
            <th className="px-6 py-4 text-left text-sm">
              Resume
            </th>

            <th className="px-6 py-4 text-left text-sm">
              Status
            </th>

            <th className="px-6 py-4 text-left text-sm">
              Size
            </th>

            <th className="px-6 py-4 text-left text-sm">
              Uploaded
            </th>

            <th className="px-6 py-4 text-center text-sm">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {resumes.map((resume) => (
            <tr
              key={resume.id}
              className={`border-b transition last:border-none hover:bg-muted/30 ${
                resume.isActive
                  ? 'bg-amber-50 dark:bg-amber-500/10'
                  : ''
              }`}
            >
              <td className="px-6 py-5">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">
                      {resume.originalName}
                    </p>

                    {resume.isActive && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2 py-1 text-xs font-semibold text-white">
                        <BadgeCheck size={12} />
                        Active
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {resume.filename}
                  </p>
                </div>
              </td>

              <td className="px-6 py-5">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    resume.status === 'COMPLETED'
                      ? 'bg-green-100 text-green-700'
                      : resume.status === 'PROCESSING'
                      ? 'bg-yellow-100 text-yellow-700'
                      : resume.status === 'FAILED'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {resume.status}
                </span>
              </td>

              <td className="px-6 py-5">
                {(resume.size / 1024).toFixed(1)} KB
              </td>

              <td className="px-6 py-5 text-muted-foreground">
                {new Date(
                  resume.createdAt,
                ).toLocaleDateString()}
              </td>

              <td className="px-6 py-5">
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onView?.(resume)
                    }
                    className="rounded-lg p-2 transition hover:bg-muted"
                    title="Preview"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onDownload?.(resume)
                    }
                    className="rounded-lg p-2 transition hover:bg-muted"
                    title="Download"
                  >
                    <Download size={18} />
                  </button>

                  <button
                    type="button"
                    disabled={resume.isActive}
                    onClick={() =>
                      onActivate?.(resume.id)
                    }
                    className={`rounded-lg p-2 transition ${
                      resume.isActive
                        ? 'cursor-default bg-amber-500 text-white'
                        : 'text-amber-500 hover:bg-amber-500/10'
                    }`}
                    title={
                      resume.isActive
                        ? 'Active Resume'
                        : 'Set Active'
                    }
                  >
                    <Star
                      size={18}
                      fill={
                        resume.isActive
                          ? 'currentColor'
                          : 'none'
                      }
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onDelete?.(resume.id)
                    }
                    className="rounded-lg p-2 text-red-500 transition hover:bg-red-500/10"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResumeTable;
