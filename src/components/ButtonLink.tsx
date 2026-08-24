import type { ReactNode } from 'react';

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'quiet';
}

export function ButtonLink({ href, children, variant = 'primary' }: ButtonLinkProps) {
  return (
    <a
      className={`button-link button-link-${variant} focus-ring`}
      href={href}
    >
      {children}
    </a>
  );
}
