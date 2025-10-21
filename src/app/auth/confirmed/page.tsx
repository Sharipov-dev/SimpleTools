'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutGrid, CheckCircle } from 'lucide-react';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import { GridPattern } from '@/components/GridPattern';

export default function ConfirmPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Animated background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-transparent to-transparent"></div>
      <FloatingOrbs />
      <GridPattern />
      <AnimatedBackground />

      {/* Confirmation Message */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Account Confirmed!
          </h1>
          <p className="text-zinc-400 mb-6">
            Your email has been successfully verified.
          </p>
        </div>

        <div className="bg-zinc-950/80 backdrop-blur-sm rounded-xl border border-zinc-800 p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-white/5 border border-white/10">
            <LayoutGrid className="w-8 h-8 text-white" />
          </div>
          <p className="text-white mb-2">Welcome to Task Dashboard!</p>
          <p className="text-zinc-500 text-sm">
            Redirecting to login in {countdown} second{countdown !== 1 ? 's' : ''}...
          </p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/login')}
            className="text-zinc-400 hover:text-white text-sm transition-colors"
          >
            Click here if not redirected automatically
          </button>
        </div>
      </div>
    </main>
  );
}

