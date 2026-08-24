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
          <a className="focus-ring" href="/">
            Home
          </a>
          <a className="focus-ring" href="/study">
            Study All
          </a>
          <a className="focus-ring" href="/practice">
            Practice
          </a>
          <a className="focus-ring" href="/interview">
            Real Interview
          </a>
          <a className="focus-ring" href="/progress">
            Progress
          </a>
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
