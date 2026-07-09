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

function RegisterPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] =
    useState('');

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

      await authService.register({
        fullName,
        email,
        password,
      });

      alert(
        'Registration successful. Please sign in.',
      );

      navigate('/login');
    } catch (error) {
      console.error(error);

      alert(
        'Registration failed.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-border/60 shadow-xl">
      <CardHeader>
        <CardTitle>
          Create Account
        </CardTitle>

        <CardDescription>
          Create your INTERVIEWED account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full Name
            </Label>

            <Input
              id="fullName"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) =>
                setFullName(
                  e.target.value,
                )
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
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
            <Label htmlFor="password">
              Password
            </Label>

            <Input
              id="password"
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
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? 'Creating Account...'
              : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-indigo-500 hover:underline"
          >
            Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default RegisterPage;
