import { TaskManager } from '@/components/TaskManager';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { FloatingOrbs } from '@/components/FloatingOrbs';
import { GridPattern } from '@/components/GridPattern';
import { Header } from '@/components/Header';
import { LayoutGrid } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-hidden">
      {/* Animated background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/50 via-transparent to-transparent"></div>
      <FloatingOrbs />
      <GridPattern />
      <AnimatedBackground />
      {/* Content */}
      <div className="relative max-w-7xl mx-auto py-8 z-10 pt-28">
        <div className="mb-8 px-6">
          <div className="flex items-center gap-3 mb-2">
            <LayoutGrid className="w-8 h-8 text-white" />
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Task Dashboard
            </h1>
          </div>
          <p className="text-zinc-400">
            Organize and manage your tasks efficiently
          </p>
        </div>
        <TaskManager />
      </div>
            {/* Header Dock */}
            <Header />
    </main>
  );
}