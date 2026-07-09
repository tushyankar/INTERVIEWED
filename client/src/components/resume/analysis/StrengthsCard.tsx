import {
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface StrengthsCardProps {
  strengths: string[];
}

function StrengthsCard({
  strengths,
}: StrengthsCardProps) {
  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-green-500/10 p-3">
          <Sparkles className="text-green-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Key Strengths
          </h2>

          <p className="text-sm text-muted-foreground">
            Identified by Gemini
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {strengths.map((strength) => (
          <div
            key={strength}
            className="flex items-start gap-3 rounded-xl border p-3"
          >
            <CheckCircle2
              size={18}
              className="mt-0.5 text-green-600"
            />

            <p className="leading-6">
              {strength}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StrengthsCard;
