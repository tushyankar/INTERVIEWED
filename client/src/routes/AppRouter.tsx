import { Navigate, Route, Routes } from 'react-router-dom';

import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';

import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';

import DashboardPage from '@/pages/dashboard/DashboardPage';
import ResumePage from '@/pages/resume/ResumePage';

import ProtectedRoute from '@/routes/ProtectedRoute';

function Placeholder({
  title,
}: {
  title: string;
}) {
  return (
    <div className="flex h-full items-center justify-center">
      <h1 className="text-4xl font-bold">
        {title}
      </h1>
    </div>
  );
}

function AppRouter() {
  return (
    <Routes>
      {/* Root */}

      <Route
        path="/"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

      {/* Authentication */}

      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />
      </Route>

      {/* Protected */}

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/resume"
          element={<ResumePage />}
        />

        <Route
          path="/interview"
          element={<Placeholder title="Interview" />}
        />

        <Route
          path="/analytics"
          element={<Placeholder title="Analytics" />}
        />

        <Route
          path="/settings"
          element={<Placeholder title="Settings" />}
        />
      </Route>

      {/* 404 */}

      <Route
        path="*"
        element={<Placeholder title="404" />}
      />
    </Routes>
  );
}

export default AppRouter;