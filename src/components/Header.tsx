'use client';

import { usePathname } from 'next/navigation';
import { Menu, Moon, Search, Sun } from 'lucide-react';
import { useState } from 'react';
import { USFlagMark } from '@/src/components/USFlagMark';
import { useProgress } from '@/src/hooks/useProgress';
import type { ThemePreference } from '@/src/utils/storage';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/study', label: 'Study All' },
  { href: '/practice', label: 'Practice' },
  { href: '/interview', label: 'Real Interview' },
  { href: '/review', label: 'Review' },
  { href: '/progress', label: 'Progress' },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { progress, setTheme } = useProgress();
  const nextTheme = getNextTheme(progress.preferences.theme);
  const ThemeIcon = progress.preferences.theme === 'dark' ? Moon : Sun;

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="brand-lockup focus-ring" href="/">
          <USFlagMark />
          <span>
            <strong>Citizenship Practice</strong>
            <small>Naturalization Interview Preparation</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              className={`nav-link focus-ring ${pathname === item.href ? 'is-active' : ''}`}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="icon-text-action focus-ring" href="/study" aria-label="Search questions">
            <Search aria-hidden="true" size={17} />
            <span>Search</span>
          </a>
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
              <a
                key={item.href}
                className={`mobile-nav-link focus-ring ${pathname === item.href ? 'is-active' : ''}`}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mobile-nav-actions">
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
