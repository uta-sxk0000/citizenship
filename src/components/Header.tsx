'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Languages, Menu, Moon, Search, Sun } from 'lucide-react';
import { useState } from 'react';
import { USFlagMark } from '@/src/components/USFlagMark';
import { useProgress } from '@/src/hooks/useProgress';
import type { ThemePreference } from '@/src/utils/storage';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/study', label: 'Study All' },
  { href: '/practice', label: 'Practice' },
  { href: '/review', label: 'Review' },
  { href: '/progress', label: 'Progress' },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { progress, setTheme, setShowNepali } = useProgress();
  const nextTheme = getNextTheme(progress.preferences.theme);
  const ThemeIcon = progress.preferences.theme === 'dark' ? Moon : Sun;

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="brand-lockup focus-ring" href="/">
          <USFlagMark />
          <span>
            <strong>Citizenship Practice</strong>
            <small>Naturalization Interview Preparation</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className={`nav-link focus-ring ${pathname === item.href ? 'is-active' : ''}`}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="icon-text-action focus-ring" href="/study" aria-label="Search questions">
            <Search aria-hidden="true" size={17} />
            <span>Search</span>
          </Link>
          <button
            className="icon-action focus-ring"
            type="button"
            aria-label="Toggle Nepali translations"
            aria-pressed={progress.preferences.showNepali}
            onClick={() => setShowNepali(!progress.preferences.showNepali)}
            title="Nepali"
          >
            <Languages aria-hidden="true" size={17} />
          </button>
          <button
            className="icon-action focus-ring"
            type="button"
            aria-label={`Switch theme to ${nextTheme}`}
            onClick={() => setTheme(nextTheme)}
            title={`Theme: ${themeLabel[progress.preferences.theme]}`}
          >
            <ThemeIcon aria-hidden="true" size={17} />
          </button>
        </div>

        <button
          className="mobile-menu-button focus-ring"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <Menu aria-hidden="true" size={20} />
          Menu
        </button>
      </div>

      {open ? (
        <div id="mobile-menu" className="mobile-nav-panel">
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                className={`mobile-nav-link focus-ring ${pathname === item.href ? 'is-active' : ''}`}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mobile-nav-actions">
            <button
              className="secondary-action focus-ring"
              type="button"
              aria-pressed={progress.preferences.showNepali}
              onClick={() => setShowNepali(!progress.preferences.showNepali)}
            >
              <Languages aria-hidden="true" size={16} />
              नेपाली
            </button>
            <button
              className="secondary-action focus-ring"
              type="button"
              onClick={() => setTheme(nextTheme)}
            >
              <ThemeIcon aria-hidden="true" size={16} />
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
