import CandidateCard from './analysis/CandidateCard';
import CertificationsCard from './analysis/CertificationsCard';
import EducationCard from './analysis/EducationCard';
import ExperienceCard from './analysis/ExperienceCard';
import ProjectsCard from './analysis/ProjectsCard';
import RecommendedRolesCard from './analysis/RecommendedRolesCard';
import SkillsCard from './analysis/SkillsCard';
import StrengthsCard from './analysis/StrengthsCard';
import SummaryCard from './analysis/SummaryCard';

import type { Resume } from '@/types/resume';

interface ResumeAnalysisPanelProps {
  resume: Resume | null;
}

function ResumeAnalysisPanel({
  resume,
}: ResumeAnalysisPanelProps) {
  if (!resume) {
    return (
      <section className="rounded-2xl border bg-card p-12 text-center shadow-sm">
        <h2 className="text-2xl font-bold">
          Resume Intelligence
        </h2>

        <p className="mt-4 text-muted-foreground">
          Select a resume from the library to view its AI
          analysis.
        </p>
      </section>
    );
  }

  if (resume.status !== 'COMPLETED') {
    return (
      <section className="rounded-2xl border bg-card p-12 text-center shadow-sm">
        <h2 className="text-2xl font-bold">
          AI Analysis
        </h2>

        <p className="mt-4 text-muted-foreground">
          Resume analysis is currently{' '}
          <span className="font-semibold">
            {resume.status}
          </span>
          .
        </p>
      </section>
    );
  }

  if (!resume.aiAnalysis) {
    return (
      <section className="rounded-2xl border bg-card p-12 text-center shadow-sm">
        <h2 className="text-2xl font-bold">
          No Analysis Available
        </h2>

        <p className="mt-4 text-muted-foreground">
          AI did not return any structured analysis for
          this resume.
        </p>
      </section>
    );
  }

  const analysis = resume.aiAnalysis;

  return (
    <div className="space-y-8">
      <CandidateCard
        candidate={analysis.candidate}
        careerLevel={analysis.careerLevel}
      />

      <SummaryCard
        summary={analysis.summary}
      />

      <SkillsCard
        skills={analysis.skills}
      />

      <StrengthsCard
        strengths={analysis.strengths}
      />

      <RecommendedRolesCard
        roles={
          analysis.recommendedRoles
        }
      />

      <ExperienceCard
        experience={
          analysis.experience
        }
      />

      <ProjectsCard
        projects={
          analysis.projects
        }
      />

      <EducationCard
        education={
          analysis.education
        }
      />

      <CertificationsCard
        certifications={
          analysis.certifications
        }
      />
    </div>
  );
}

export default ResumeAnalysisPanel;
