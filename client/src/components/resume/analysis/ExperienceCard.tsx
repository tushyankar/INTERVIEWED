import { Building2 } from 'lucide-react';

import type { ResumeExperience } from '@/types/resume';

interface ExperienceCardProps {
  experience: ResumeExperience[];
}

function ExperienceCard({
  experience,
}: ExperienceCardProps) {
  if (experience.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-primary/10 p-3">
          <Building2 className="text-primary" />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Experience
          </h2>

          <p className="text-sm text-muted-foreground">
            Professional Experience
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {experience.map((job, index) => (
          <div
            key={index}
            className="rounded-xl border p-5"
          >
            <h3 className="text-lg font-semibold">
              {job.role}
            </h3>

            <p className="font-medium text-primary">
              {job.company}
            </p>

            <p className="mb-4 text-sm text-muted-foreground">
              {job.duration}
              {job.location
                ? ` • ${job.location}`
                : ''}
            </p>

            <ul className="list-disc space-y-2 pl-5">
              {job.description.map(
                (point, i) => (
                  <li key={i}>
                    {point}
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExperienceCard;
