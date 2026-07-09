import { FileText } from 'lucide-react';

interface SummaryCardProps {
  summary: string;
}

function SummaryCard({
  summary,
}: SummaryCardProps) {
  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-primary/10 p-3">
          <FileText className="text-primary" />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Professional Summary
          </h2>

          <p className="text-sm text-muted-foreground">
            AI Generated Overview
          </p>
        </div>
      </div>

      <p className="leading-8 text-muted-foreground">
        {summary}
      </p>
    </section>
  );
}

export default SummaryCard;
