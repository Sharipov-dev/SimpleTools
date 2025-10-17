'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutGrid, LogOut, Home, User, ChevronUp } from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/shadcn-io/dock/index';
import { signOut } from '@/lib/supabaseService';
import useAuth from '@/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggingOut(false);
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.button
            key="glow-point"
            onClick={() => setIsExpanded(true)}
            className="relative focus:outline-none cursor-pointer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Outer glow rings */}
            <motion.div
              className="absolute inset-0 rounded-full bg-white/20"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ width: '48px', height: '48px' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-white/30"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              style={{ width: '48px', height: '48px' }}
            />
            
            {/* Core glow point */}
            <motion.div
              className="w-12 h-12 rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,0.6)]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            />
          </motion.button>
        ) : (
          <motion.div
            key="dock"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              duration: 0.4,
              ease: "easeOut"
            }}
          >
            <Dock className="bg-zinc-950/80 backdrop-blur-sm border border-zinc-800">
        <button
          onClick={() => setIsExpanded(false)}
          className="focus:outline-none"
        >
          <DockItem>
            <DockLabel>Collapse</DockLabel>
            <DockIcon>
              <ChevronUp className="w-5 h-5 text-zinc-400" />
            </DockIcon>
          </DockItem>
        </button>

        <div className="h-8 w-px bg-zinc-700 mx-2" />

        <button
          onClick={() => router.push('/')}
          className="focus:outline-none"
        >
          <DockItem className="relative">
            <DockLabel>Home</DockLabel>
            <DockIcon>
              <div className="relative flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
                {isActive('/') && (
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-white rounded-full" />
                )}
              </div>
            </DockIcon>
          </DockItem>
        </button>

        <button
          onClick={() => router.push('/')}
          className="focus:outline-none"
        >
          <DockItem className="relative">
            <DockLabel>Tasks</DockLabel>
            <DockIcon>
              <div className="relative flex items-center justify-center">
                <LayoutGrid className="w-5 h-5 text-white" />
                {isActive('/') && (
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-white rounded-full" />
                )}
              </div>
            </DockIcon>
          </DockItem>
        </button>

        {user && (
          <DockItem>
            <DockLabel>{user.email}</DockLabel>
            <DockIcon>
              <User className="w-5 h-5 text-zinc-400" />
            </DockIcon>
          </DockItem>
        )}

        <div className="h-8 w-px bg-zinc-700 mx-2" />

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="focus:outline-none"
        >
          <DockItem>
            <DockLabel>{isLoggingOut ? 'Logging out...' : 'Logout'}</DockLabel>
            <DockIcon>
              <LogOut className={`w-5 h-5 text-red-400 ${isLoggingOut ? 'opacity-50' : ''}`} />
            </DockIcon>
          </DockItem>
        </button>
      </Dock>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

