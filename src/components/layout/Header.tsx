'use client';

import { Sun, Moon, Menu, X } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useState } from 'react';

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { theme, toggleTheme } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed right-0 top-0 z-30 h-16 border-b border-border bg-card lg:left-64">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        <button
          onClick={onMenuClick}
          className="lg:hidden rounded-lg p-2 text-foreground hover:bg-muted"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="flex-1 lg:hidden" />

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
