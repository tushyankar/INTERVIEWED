import api from '@/services/api/api';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

export const authService = {
  login(data: LoginPayload) {
    return api.post('/auth/login', data);
  },

  register(data: RegisterPayload) {
    return api.post('/auth/register', data);
  },

  refresh() {
    return api.post('/auth/refresh');
  },

  logout() {
    return api.post('/auth/logout');
  },

  me(token: string) {
    return api.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
