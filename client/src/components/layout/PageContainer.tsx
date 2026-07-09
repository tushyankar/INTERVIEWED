import type { ReactNode } from 'react';

interface PageContainerProps {
  title: string;
  description?: string;
  children: ReactNode;
}

function PageContainer({
  title,
  description,
  children,
}: PageContainerProps) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {title}
        </h1>

        {description && (
          <p className="mt-2 text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      <div>{children}</div>
    </div>
  );
}

export default PageContainer;
