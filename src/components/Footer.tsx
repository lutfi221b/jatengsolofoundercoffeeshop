import Link from 'next/link';

const footerLinks = {
  Explore: [
    { href: '/coffee', label: 'All Coffee Shops' },
    { href: '/coffee?city=banyumas', label: 'Banyumas' },
    { href: '/coffee?city=purbalingga', label: 'Purbalingga' },
    { href: '/coffee?city=banjarnegara', label: 'Banjarnegara' },
    { href: '/coffee?city=cilacap', label: 'Cilacap' },
    { href: '/coffee?city=kebumen', label: 'Kebumen' },
  ],
  Community: [
    { href: '/submit', label: 'Add Your Coffee Shop' },
    { href: '/admin', label: 'Admin' },
  ],
  About: [
    { href: '#', label: 'About' },
    { href: '#', label: 'Contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h3 className="footer-title">{title}</h3>
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="footer-link">
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--color-hairline)' }}>
        <p style={{ fontSize: '13px', color: 'var(--color-muted)' }}>
          © 2026 Jateng Solo Founder Coffee. Built for solo founders in Barlingmascakeb.
        </p>
      </div>
    </footer>
  );
}
