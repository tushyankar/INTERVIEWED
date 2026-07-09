import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { authService } from '@/services/auth/auth.service';
import { useAuthStore } from '@/store/auth.store';

import type { LoginResponse } from '@/types/auth';

function LoginPage() {
  const navigate = useNavigate();

  const setAuth = useAuthStore(
    (state) => state.setAuth,
  );

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent,
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await authService.login({
          email,
          password,
        });

      const data =
        response.data as LoginResponse;

      setAuth(
        data.data.user,
        data.data.accessToken,
      );

      navigate('/dashboard');
    } catch (error) {
      console.error(error);

      alert(
        'Invalid email or password.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-border/60 shadow-xl">
      <CardHeader>
        <CardTitle>
          Welcome Back
        </CardTitle>

        <CardDescription>
          Login to continue.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label>Email</Label>

            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value,
                )
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>

            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value,
                )
              }
            />
          </div>

          <Button
            className="w-full"
            disabled={loading}
          >
            {loading
              ? 'Signing In...'
              : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-indigo-500 hover:underline"
          >
            Register
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default LoginPage;
