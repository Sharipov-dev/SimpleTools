'use client';

export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Subtle gradient orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-white/[0.04] rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-white/[0.035] rounded-full blur-3xl animate-pulse-slow-delayed"></div>
    </div>
  );
}

