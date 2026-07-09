import {
  Mail,
  MapPin,
  Phone,
  User,
} from 'lucide-react';

import type { ResumeCandidate } from '@/types/resume';

interface CandidateCardProps {
  candidate: ResumeCandidate;
  careerLevel: string;
}

function CandidateCard({
  candidate,
  careerLevel,
}: CandidateCardProps) {
  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-primary/10 p-3">
          <User className="text-primary" />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Candidate
          </h2>

          <p className="text-sm text-muted-foreground">
            Resume Profile
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-2xl font-bold">
            {candidate.name}
          </p>

          <span className="mt-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {careerLevel}
          </span>
        </div>

        {candidate.email && (
          <div className="flex items-center gap-3">
            <Mail
              size={18}
              className="text-muted-foreground"
            />

            <span>{candidate.email}</span>
          </div>
        )}

        {candidate.phone && (
          <div className="flex items-center gap-3">
            <Phone
              size={18}
              className="text-muted-foreground"
            />

            <span>{candidate.phone}</span>
          </div>
        )}

        {candidate.location && (
          <div className="flex items-center gap-3">
            <MapPin
              size={18}
              className="text-muted-foreground"
            />

            <span>{candidate.location}</span>
          </div>
        )}
      </div>
    </section>
  );
}

export default CandidateCard;
