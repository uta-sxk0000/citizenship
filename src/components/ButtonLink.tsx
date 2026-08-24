import Link from 'next/link';
import type { ReactNode } from 'react';

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'quiet';
}

export function ButtonLink({ href, children, variant = 'primary' }: ButtonLinkProps) {
  return (
    <Link
      className={`focus-ring inline-flex min-h-11 items-center justify-center rounded-md px-4 py-3 text-sm font800 ${variantClass[variant]}`}
      href={href}
    >
      {children}
    </Link>
  );
}

const variantClass = {
  primary: 'bg-[var(--navy)] text-white hover:bg-[var(--navy-strong)]',
  secondary:
    'border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-muted)]',
  quiet: 'text-[var(--blue)] hover:bg-[var(--surface-muted)]',
};
