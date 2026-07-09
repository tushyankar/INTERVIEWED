import { GraduationCap } from 'lucide-react';

import type { ResumeEducation } from '@/types/resume';

interface EducationCardProps {
  education: ResumeEducation[];
}

function EducationCard({
  education,
}: EducationCardProps) {
  if (education.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-primary/10 p-3">
          <GraduationCap className="text-primary" />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Education
          </h2>

          <p className="text-sm text-muted-foreground">
            Academic Background
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {education.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border p-5"
          >
            <h3 className="text-lg font-semibold">
              {item.degree}
            </h3>

            <p className="font-medium text-primary">
              {item.institution}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {item.duration}
            </p>

            {item.cgpa && (
              <p className="mt-3 inline-flex rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                CGPA: {item.cgpa}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default EducationCard;
