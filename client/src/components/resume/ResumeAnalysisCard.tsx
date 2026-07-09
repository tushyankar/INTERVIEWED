import {
  Award,
  Briefcase,
  GraduationCap,
  Lightbulb,
  User,
  Wrench,
} from 'lucide-react';

import type { ResumeAnalysis } from '@/types/resume';

interface ResumeAnalysisCardProps {
  analysis: ResumeAnalysis | null;
}

function ResumeAnalysisCard({
  analysis,
}: ResumeAnalysisCardProps) {
  if (!analysis) {
    return (
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold">
          AI Resume Analysis
        </h2>

        <p className="mt-4 text-muted-foreground">
          AI analysis is still processing or
          unavailable.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-6 rounded-2xl border bg-card p-6 shadow-sm">
      <div>
        <h2 className="text-2xl font-bold">
          AI Resume Analysis
        </h2>

        <p className="text-muted-foreground">
          Generated using Gemini
        </p>
      </div>

      <div className="rounded-xl bg-muted/40 p-4">
        <div className="flex items-center gap-2">
          <User size={18} />
          <h3 className="font-semibold">
            Candidate
          </h3>
        </div>

        <p className="mt-3 font-medium">
          {analysis.candidate.name}
        </p>

        <p className="text-sm text-muted-foreground">
          {analysis.candidate.email}
        </p>

        <p className="text-sm text-muted-foreground">
          {analysis.candidate.location}
        </p>
      </div>

      <div>
        <div className="mb-3 flex items-center gap-2">
          <Lightbulb size={18} />
          <h3 className="font-semibold">
            Summary
          </h3>
        </div>

        <p className="text-sm leading-7 text-muted-foreground">
          {analysis.summary}
        </p>
      </div>

      <div>
        <div className="mb-3 flex items-center gap-2">
          <Briefcase size={18} />
          <h3 className="font-semibold">
            Recommended Roles
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {analysis.recommendedRoles.map(
            (role) => (
              <span
                key={role}
                className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
              >
                {role}
              </span>
            ),
          )}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center gap-2">
          <Wrench size={18} />
          <h3 className="font-semibold">
            Skills
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            ...analysis.skills.languages,
            ...analysis.skills.frameworks,
            ...analysis.skills.tools,
            ...analysis.skills.databases,
            ...analysis.skills.cloud,
            ...analysis.skills.devops,
          ].map((skill) => (
            <span
              key={skill}
              className="rounded-lg border px-3 py-1 text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center gap-2">
          <Award size={18} />
          <h3 className="font-semibold">
            Strengths
          </h3>
        </div>

        <ul className="list-disc space-y-2 pl-5 text-sm">
          {analysis.strengths.map(
            (strength) => (
              <li key={strength}>
                {strength}
              </li>
            ),
          )}
        </ul>
      </div>

      <div>
        <div className="mb-3 flex items-center gap-2">
          <GraduationCap size={18} />
          <h3 className="font-semibold">
            Career Level
          </h3>
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          {analysis.careerLevel}
        </span>
      </div>
    </section>
  );
}

export default ResumeAnalysisCard;
