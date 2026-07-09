import { useEffect, useMemo, useState } from 'react';

import ResumeAnalysisPanel from '@/components/resume/ResumeAnalysisPanel';
import ResumeEmptyState from '@/components/resume/ResumeEmptyState';
import ResumeStats from '@/components/resume/ResumeStats';
import ResumeTable from '@/components/resume/ResumeTable';
import ResumeToolbar from '@/components/resume/ResumeToolbar';
import ResumeUploadCard from '@/components/resume/ResumeUploadCard';
import ResumeViewer from '@/components/resume/ResumeViewer';

import { useResumeActions } from '@/hooks/useResumeActions';
import { useResumes } from '@/hooks/useResumes';
import { useResumeViewer } from '@/hooks/useResumeViewer';

import type {
  Resume,
  ResumeStatus,
} from '@/types/resume';

function ResumePage() {
  const {
    resumes,
    loading,
    error,
    refresh,
  } = useResumes();

  const {
    deleteResume,
    activateResume,
    downloadResume,
  } = useResumeActions({
    onSuccess: refresh,
  });

  const {
    open,
    previewUrl,
    selectedResume,
    openViewer,
    closeViewer,
  } = useResumeViewer();

  const [
    selectedAnalysisResume,
    setSelectedAnalysisResume,
  ] = useState<Resume | null>(null);

  const [search, setSearch] =
    useState('');

  const [statusFilter, setStatusFilter] =
    useState<'ALL' | ResumeStatus>(
      'ALL',
    );

  const [sortBy, setSortBy] =
    useState<
      | 'newest'
      | 'oldest'
      | 'name-asc'
      | 'name-desc'
    >('newest');

  const activeResume = useMemo(
    () =>
      resumes.find(
        (resume) => resume.isActive,
      ) ??
      resumes[0] ??
      null,
    [resumes],
  );

  const filteredResumes =
    useMemo(() => {
      let data = [...resumes];

      if (search.trim()) {
        const query =
          search.toLowerCase();

        data = data.filter(
          (resume) =>
            resume.originalName
              .toLowerCase()
              .includes(query) ||
            resume.filename
              .toLowerCase()
              .includes(query),
        );
      }

      if (statusFilter !== 'ALL') {
        data = data.filter(
          (resume) =>
            resume.status ===
            statusFilter,
        );
      }

      switch (sortBy) {
        case 'oldest':
          data.sort(
            (a, b) =>
              new Date(
                a.createdAt,
              ).getTime() -
              new Date(
                b.createdAt,
              ).getTime(),
          );
          break;

        case 'name-asc':
          data.sort((a, b) =>
            a.originalName.localeCompare(
              b.originalName,
            ),
          );
          break;

        case 'name-desc':
          data.sort((a, b) =>
            b.originalName.localeCompare(
              a.originalName,
            ),
          );
          break;

        default:
          data.sort(
            (a, b) =>
              new Date(
                b.createdAt,
              ).getTime() -
              new Date(
                a.createdAt,
              ).getTime(),
          );
      }

      return data;
    }, [
      resumes,
      search,
      statusFilter,
      sortBy,
    ]);

  useEffect(() => {
    if (!selectedAnalysisResume) {
      setSelectedAnalysisResume(
        activeResume,
      );
      return;
    }

    const updated = resumes.find(
      (resume) =>
        resume.id ===
        selectedAnalysisResume.id,
    );

    if (updated) {
      setSelectedAnalysisResume(
        updated,
      );
    }
  }, [
    resumes,
    activeResume,
    selectedAnalysisResume,
  ]);

  async function handleDelete(
    id: string,
  ) {
    if (
      !window.confirm(
        'Delete this resume?',
      )
    ) {
      return;
    }

    try {
      await deleteResume(id);
    } catch {
      alert(
        'Failed to delete resume.',
      );
    }
  }

  async function handleActivate(
    id: string,
  ) {
    try {
      await activateResume(id);

      const resume =
        resumes.find(
          (r) => r.id === id,
        ) ?? null;

      setSelectedAnalysisResume(
        resume,
      );

      alert(
        'Resume activated successfully.',
      );
    } catch {
      alert(
        'Failed to activate resume.',
      );
    }
  }

  function handleView(
    resume: Resume,
  ) {
    setSelectedAnalysisResume(
      resume,
    );

    openViewer(resume);
  }

  async function handleDownload(
    resume: Resume,
  ) {
    try {
      await downloadResume(
        resume.id,
        resume.originalName,
      );
    } catch {
      alert(
        'Failed to download resume.',
      );
    }
  }
  return (
    <>
      <ResumeViewer
        open={open}
        title={
          selectedResume?.originalName ??
          'Resume Preview'
        }
        url={previewUrl}
        onClose={closeViewer}
      />

      <div className="space-y-8">
        <ResumeToolbar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={
            setStatusFilter
          }
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <ResumeUploadCard />

        <ResumeStats
          resumes={filteredResumes}
          loading={loading}
        />

        <div className="grid gap-8 xl:grid-cols-5">
          <div className="xl:col-span-2">
            <section className="rounded-2xl border bg-card p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold">
                Resume Library
              </h2>

              {loading && (
                <div className="py-12 text-center">
                  Loading resumes...
                </div>
              )}

              {!loading &&
                error && (
                  <div className="py-12 text-center text-red-500">
                    {error}
                  </div>
                )}

              {!loading &&
                !error &&
                filteredResumes.length ===
                  0 && (
                  <ResumeEmptyState />
                )}

              {!loading &&
                !error &&
                filteredResumes.length >
                  0 && (
                  <ResumeTable
                    resumes={
                      filteredResumes
                    }
                    onDelete={
                      handleDelete
                    }
                    onActivate={
                      handleActivate
                    }
                    onView={
                      handleView
                    }
                    onDownload={
                      handleDownload
                    }
                  />
                )}
            </section>
          </div>

          <div className="xl:col-span-3">
            <ResumeAnalysisPanel
              resume={
                selectedAnalysisResume
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ResumePage;
