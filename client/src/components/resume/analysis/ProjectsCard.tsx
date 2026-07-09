import { FolderGit2 } from 'lucide-react';

import type { ResumeProject } from '@/types/resume';

interface ProjectsCardProps {
  projects: ResumeProject[];
}

function ProjectsCard({
  projects,
}: ProjectsCardProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-primary/10 p-3">
          <FolderGit2 className="text-primary" />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Projects
          </h2>

          <p className="text-sm text-muted-foreground">
            AI Extracted Projects
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project, index) => (
          <div
            key={index}
            className="rounded-xl border p-5"
          >
            <h3 className="text-lg font-semibold">
              {project.name}
            </h3>

            <p className="mt-3 text-muted-foreground">
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary"
                  >
                    {tech}
                  </span>
                ),
              )}
            </div>

            <ul className="mt-4 list-disc space-y-2 pl-5">
              {project.highlights.map(
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

export default ProjectsCard;
