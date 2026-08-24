'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useProgress } from '@/src/hooks/useProgress';
import type { ThemePreference } from '@/src/utils/storage';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/study', label: 'Study' },
  { href: '/practice', label: 'Practice' },
  { href: '/review', label: 'Review' },
  { href: '/progress', label: 'Progress' },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { progress, setTheme, setShowNepali } = useProgress();
  const nextTheme = getNextTheme(progress.preferences.theme);

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_94%,transparent)] backdrop-blur">
      <div className="mx-auto flex w-[min(1120px,calc(100%-32px))] items-center justify-between gap-4 py-3">
        <Link className="focus-ring grid min-w-0 gap-0.5 rounded-md" href="/">
          <span className="text-base font900 text-[var(--navy-strong)]">Citizenship Practice</span>
          <span className="hidden text-xs text-[var(--muted)] sm:block">
            U.S. Naturalization Interview Preparation
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className={`focus-ring rounded-md px-3 py-2 text-sm font800 ${
                pathname === item.href
                  ? 'bg-[var(--surface-muted)] text-[var(--navy-strong)]'
                  : 'text-[var(--muted-strong)] hover:bg-[var(--surface-muted)]'
              }`}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            className="focus-ring rounded-md border border-[var(--border)] px-3 py-2 text-sm font800 text-[var(--muted-strong)] hover:bg-[var(--surface-muted)]"
            type="button"
            aria-pressed={progress.preferences.showNepali}
            onClick={() => setShowNepali(!progress.preferences.showNepali)}
          >
            {progress.preferences.showNepali ? 'नेपाली On' : 'EN / नेपाली'}
          </button>
          <button
            className="focus-ring rounded-md border border-[var(--border)] px-3 py-2 text-sm font800 text-[var(--muted-strong)] hover:bg-[var(--surface-muted)]"
            type="button"
            aria-label={`Switch theme to ${nextTheme}`}
            onClick={() => setTheme(nextTheme)}
          >
            Theme: {themeLabel[progress.preferences.theme]}
          </button>
        </div>

        <button
          className="focus-ring rounded-md border border-[var(--border)] px-3 py-2 text-sm font800 md:hidden"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          Menu
        </button>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-[var(--border)] bg-[var(--surface)] px-4 pb-4 md:hidden"
        >
          <nav className="grid gap-1 py-3" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                className={`focus-ring rounded-md px-3 py-3 text-sm font800 ${
                  pathname === item.href
                    ? 'bg-[var(--surface-muted)] text-[var(--navy-strong)]'
                    : 'text-[var(--muted-strong)]'
                }`}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="grid grid-cols-2 gap-2">
            <button
              className="focus-ring rounded-md border border-[var(--border)] px-3 py-3 text-sm font800"
              type="button"
              aria-pressed={progress.preferences.showNepali}
              onClick={() => setShowNepali(!progress.preferences.showNepali)}
            >
              {progress.preferences.showNepali ? 'नेपाली On' : 'EN / नेपाली'}
            </button>
            <button
              className="focus-ring rounded-md border border-[var(--border)] px-3 py-3 text-sm font800"
              type="button"
              aria-label={`Switch theme to ${nextTheme}`}
              onClick={() => setTheme(nextTheme)}
            >
              {themeLabel[progress.preferences.theme]}
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

const themeLabel: Record<ThemePreference, string> = {
  system: 'System',
  light: 'Light',
  dark: 'Dark',
};

function getNextTheme(theme: ThemePreference): ThemePreference {
  if (theme === 'system') {
    return 'light';
  }
  if (theme === 'light') {
    return 'dark';
  }
  return 'system';
}
