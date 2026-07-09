import {
  CheckCircle2,
  FileBadge2,
  FileText,
  HardDrive,
} from 'lucide-react';

import type { Resume } from '@/types/resume';

interface ResumeStatsProps {
  resumes: Resume[];
  loading: boolean;
}

function ResumeStats({
  resumes,
  loading,
}: ResumeStatsProps) {
  const totalStorage =
    resumes.reduce(
      (total, resume) => total + resume.size,
      0,
    ) /
    (1024 * 1024);

  const activeResume =
    resumes.find((r) => r.isActive);

  const completed =
    resumes.filter(
      (r) => r.status === 'COMPLETED',
    ).length;

  const completionRate =
    resumes.length === 0
      ? 0
      : Math.round(
          (completed / resumes.length) *
            100,
        );

  const cards = [
    {
      icon: FileText,
      title: 'Total Resumes',
      value: loading ? '--' : resumes.length,
    },
    {
      icon: FileBadge2,
      title: 'Active Resume',
      value: loading
        ? '--'
        : activeResume?.originalName ??
          'None',
    },
    {
      icon: HardDrive,
      title: 'Storage Used',
      value: loading
        ? '--'
        : `${totalStorage.toFixed(2)} MB`,
    },
    {
      icon: CheckCircle2,
      title: 'AI Completed',
      value: loading
        ? '--'
        : `${completionRate}%`,
    },
  ];

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border bg-card p-6 shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <card.icon className="text-primary" />

            <h2 className="text-sm font-medium text-muted-foreground">
              {card.title}
            </h2>
          </div>

          <p className="mt-5 truncate text-3xl font-bold">
            {card.value}
          </p>
        </div>
      ))}
    </section>
  );
}

export default ResumeStats;
