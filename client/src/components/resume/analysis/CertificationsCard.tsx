import { Award } from 'lucide-react';

interface CertificationsCardProps {
  certifications: string[];
}

function CertificationsCard({
  certifications,
}: CertificationsCardProps) {
  if (certifications.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-primary/10 p-3">
          <Award className="text-primary" />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Certifications
          </h2>

          <p className="text-sm text-muted-foreground">
            Professional Certifications
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {certifications.map((certification) => (
          <span
            key={certification}
            className="rounded-full border bg-muted/40 px-4 py-2 text-sm font-medium"
          >
            {certification}
          </span>
        ))}
      </div>
    </section>
  );
}

export default CertificationsCard;
