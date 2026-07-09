import { Code2 } from 'lucide-react';

import type { ResumeSkills } from '@/types/resume';

interface SkillsCardProps {
  skills: ResumeSkills;
}

function SkillSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>

      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-lg border bg-muted/40 px-3 py-1 text-sm transition hover:bg-primary hover:text-primary-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function SkillsCard({
  skills,
}: SkillsCardProps) {
  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-primary/10 p-3">
          <Code2 className="text-primary" />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Technical Skills
          </h2>

          <p className="text-sm text-muted-foreground">
            Technologies detected by AI
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <SkillSection
          title="Languages"
          items={skills.languages}
        />

        <SkillSection
          title="Frameworks"
          items={skills.frameworks}
        />

        <SkillSection
          title="Libraries"
          items={skills.libraries}
        />

        <SkillSection
          title="Databases"
          items={skills.databases}
        />

        <SkillSection
          title="Tools"
          items={skills.tools}
        />

        <SkillSection
          title="Cloud"
          items={skills.cloud}
        />

        <SkillSection
          title="DevOps"
          items={skills.devops}
        />
      </div>
    </section>
  );
}

export default SkillsCard;
