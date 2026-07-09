import {
  type ReactNode,
  useEffect,
  useState,
} from 'react';

import { authService } from '@/services/auth/auth.service';
import { useAuthStore } from '@/store/auth.store';

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({
  children,
}: AuthProviderProps) {
  const setAuth = useAuthStore(
    (state) => state.setAuth,
  );

  const logout = useAuthStore(
    (state) => state.logout,
  );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const refreshResponse =
          await authService.refresh();

        const accessToken =
          refreshResponse.data.data.accessToken;

        const meResponse =
          await authService.me(accessToken);

        setAuth(
          meResponse.data.data,
          accessToken,
        );
      } catch (error) {
        console.error(error);

        logout();
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, [logout, setAuth]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading...
        </p>
      </div>
    );
  }

  return children;
}

export default AuthProvider;
