import {
  BriefcaseBusiness,
} from 'lucide-react';

interface RecommendedRolesCardProps {
  roles: string[];
}

function RecommendedRolesCard({
  roles,
}: RecommendedRolesCardProps) {
  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-primary/10 p-3">
          <BriefcaseBusiness className="text-primary" />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Recommended Roles
          </h2>

          <p className="text-sm text-muted-foreground">
            Suggested by AI
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {roles.map((role) => (
          <span
            key={role}
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            {role}
          </span>
        ))}
      </div>
    </section>
  );
}

export default RecommendedRolesCard;

