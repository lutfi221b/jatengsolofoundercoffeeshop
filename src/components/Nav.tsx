import Link from 'next/link';

const navLinks = [
  { href: '/coffee', label: 'Explore' },
  { href: '/submit', label: 'Add Coffee Shop' },
];

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-content">
        <Link href="/" className="nav-logo">
          ☕ Jateng Solo Founder Coffee
        </Link>
        <div className="nav-links">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
