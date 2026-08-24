import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto grid w-[min(1120px,calc(100%-32px))] gap-6 py-8 md:grid-cols-[1.2fr_1fr]">
        <div className="grid gap-2">
          <p className="text-base font900 text-[var(--navy-strong)]">Citizenship Practice</p>
          <p className="max-w-2xl text-sm leading-6 text-[var(--muted)]">
            Built as an independent naturalization study resource.
          </p>
          <p className="max-w-3xl text-sm leading-6 text-[var(--muted)]">
            Independent educational study tool. Not affiliated with or endorsed by USCIS or the U.S. government.
            Verify current naturalization requirements and time-sensitive answers with USCIS.gov before your interview.
          </p>
        </div>
        <div className="grid content-start gap-3 md:justify-end">
          <nav className="flex flex-wrap gap-3 text-sm font800" aria-label="Footer navigation">
            <Link className="focus-ring rounded-md px-2 py-1 hover:bg-[var(--surface-muted)]" href="/">
              Home
            </Link>
            <Link className="focus-ring rounded-md px-2 py-1 hover:bg-[var(--surface-muted)]" href="/study">
              Study
            </Link>
            <Link className="focus-ring rounded-md px-2 py-1 hover:bg-[var(--surface-muted)]" href="/practice">
              Practice
            </Link>
            <Link className="focus-ring rounded-md px-2 py-1 hover:bg-[var(--surface-muted)]" href="/progress">
              Progress
            </Link>
            <a
              className="focus-ring rounded-md px-2 py-1 hover:bg-[var(--surface-muted)]"
              href="https://www.uscis.gov/citizenship"
              rel="noreferrer"
              target="_blank"
            >
              USCIS Official Resources
            </a>
          </nav>
          <p className="text-sm text-[var(--muted)]">© {currentYear} Sagar Khadka</p>
        </div>
      </div>
    </footer>
  );
}
