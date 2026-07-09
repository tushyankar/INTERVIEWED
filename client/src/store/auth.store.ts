import { create } from 'zustand';

interface User {
  id: string;
  fullName: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  setAuth: (
    user: User,
    token: string,
  ) => void;

  logout: () => void;
}

export const useAuthStore =
  create<AuthStore>((set) => ({
    user: null,

    accessToken: null,

    isAuthenticated: false,

    setAuth: (
      user,
      token,
    ) =>
      set({
        user,
        accessToken: token,
        isAuthenticated: true,
      }),

    logout: () =>
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
      }),
  }));
