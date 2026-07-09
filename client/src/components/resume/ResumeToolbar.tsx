import {
  Briefcase,
  Search,
  Upload,
} from 'lucide-react';

import type { ResumeStatus } from '@/types/resume';

interface ResumeToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  statusFilter:
    | 'ALL'
    | ResumeStatus;
  onStatusFilterChange: (
    value: 'ALL' | ResumeStatus,
  ) => void;

  sortBy:
    | 'newest'
    | 'oldest'
    | 'name-asc'
    | 'name-desc';
  onSortChange: (
    value:
      | 'newest'
      | 'oldest'
      | 'name-asc'
      | 'name-desc',
  ) => void;

  onUpload?: () => void;
}

function ResumeToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortChange,
  onUpload,
}: ResumeToolbarProps) {
  return (
    <section className="rounded-3xl border bg-card p-8 shadow-sm">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Briefcase size={16} />
              Resume Management
            </div>

            <h1 className="text-4xl font-bold tracking-tight">
              Resume Dashboard
            </h1>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Upload, organize and manage multiple
              resumes for different job applications.
            </p>
          </div>

          <button
            type="button"
            onClick={onUpload}
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90"
          >
            <Upload size={18} />
            Upload Resume
          </button>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                onSearchChange(
                  e.target.value,
                )
              }
              placeholder="Search resumes..."
              className="w-full rounded-xl border bg-background py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              onStatusFilterChange(
                e.target.value as
                  | 'ALL'
                  | ResumeStatus,
              )
            }
            className="rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="ALL">
              All Status
            </option>

            <option value="PENDING">
              Pending
            </option>

            <option value="PROCESSING">
              Processing
            </option>

            <option value="COMPLETED">
              Completed
            </option>

            <option value="FAILED">
              Failed
            </option>
          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              onSortChange(
                e.target.value as
                  | 'newest'
                  | 'oldest'
                  | 'name-asc'
                  | 'name-desc',
              )
            }
            className="rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="newest">
              Newest First
            </option>

            <option value="oldest">
              Oldest First
            </option>

            <option value="name-asc">
              Name (A-Z)
            </option>

            <option value="name-desc">
              Name (Z-A)
            </option>
          </select>
        </div>
      </div>
    </section>
  );
}

export default ResumeToolbar;
