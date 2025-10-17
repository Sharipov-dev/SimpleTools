'use client';

export function GridPattern() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Minimal dot grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(255, 255, 255, 0.4) 0.5px, transparent 0.5px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Subtle corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-white/20"></div>
      <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-white/20"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-white/20"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-white/20"></div>
    </div>
  );
}

