import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            INTERVIEWED
          </h1>

          <p className="mt-3 text-muted-foreground">
            AI-Powered Mock Interview Platform
          </p>
        </div>

        <Outlet />
      </div>
    </main>
  );
}

export default AuthLayout;
