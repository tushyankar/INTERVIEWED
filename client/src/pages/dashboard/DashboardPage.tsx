import {
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  FileText,
  Video,
} from 'lucide-react';

const stats = [
  {
    title: 'Interviews',
    value: '0',
    icon: Video,
  },
  {
    title: 'Resumes',
    value: '0',
    icon: FileText,
  },
  {
    title: 'Average Score',
    value: '--',
    icon: BrainCircuit,
  },
  {
    title: 'Analytics',
    value: '0',
    icon: BarChart3,
  },
];

function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border bg-card p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Welcome Back 👋
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-tight">
              INTERVIEWED Dashboard
            </h1>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Manage resumes, prepare for interviews,
              monitor your progress and analyse your
              performance from one place.
            </p>
          </div>

          <div className="hidden rounded-2xl bg-primary p-5 text-primary-foreground lg:block">
            <ArrowUpRight size={40} />
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                <span className="text-xs text-muted-foreground">
                  Overview
                </span>
              </div>

              <h2 className="mt-6 text-3xl font-bold">
                {item.value}
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {item.title}
              </p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            Recent Interviews
          </h2>

          <div className="mt-8 flex h-56 items-center justify-center rounded-xl border border-dashed">
            <p className="text-muted-foreground">
              No interviews yet.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            Recent Resumes
          </h2>

          <div className="mt-8 flex h-56 items-center justify-center rounded-xl border border-dashed">
            <p className="text-muted-foreground">
              No resumes uploaded.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
