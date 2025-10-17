'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutGrid, Mail, Lock } from 'lucide-react';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import { GridPattern } from '@/components/GridPattern';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {signIn} from '@/lib/supabaseService';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await signIn(email, password);
      console.log('Login successful:', data);
      // Redirect to home page after successful login
      router.push('/');
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Animated background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-transparent to-transparent"></div>
      <FloatingOrbs />
      <GridPattern />
      <AnimatedBackground />

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-white/5 border border-white/10">
            <LayoutGrid className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-zinc-400">
            Sign in to continue to your dashboard
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-zinc-950/80 backdrop-blur-sm rounded-xl border border-zinc-800 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-zinc-400 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-white focus:ring-white focus:ring-offset-0"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-sm text-zinc-400">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              className="text-white hover:underline font-medium"
            >
              Sign up
            </button>
          </div>
        </div>

        {/* Footer Text */}
        <p className="mt-8 text-center text-xs text-zinc-600">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </main>
  );
}

