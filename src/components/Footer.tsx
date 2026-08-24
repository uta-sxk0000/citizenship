import Link from 'next/link';
import { USFlagMark } from '@/src/components/USFlagMark';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand">
          <USFlagMark />
          <div>
            <p>Citizenship Practice</p>
            <span>Independent study tool for U.S. naturalization preparation.</span>
          </div>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link className="focus-ring" href="/">
            Home
          </Link>
          <Link className="focus-ring" href="/study">
            Study All
          </Link>
          <Link className="focus-ring" href="/practice">
            Practice
          </Link>
          <Link className="focus-ring" href="/progress">
            Progress
          </Link>
          <a
            className="focus-ring"
            href="https://www.uscis.gov/citizenship"
            rel="noreferrer"
            target="_blank"
          >
            USCIS.gov
          </a>
        </nav>
        <p className="footer-disclaimer">
          Not affiliated with or endorsed by USCIS or the U.S. government. Verify official information at USCIS.gov.
        </p>
        <p className="footer-copy">© {currentYear} Sagar Khadka</p>
      </div>
    </footer>
  );
}
