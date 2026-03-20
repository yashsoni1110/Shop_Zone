import { Link } from 'react-router-dom';
import { ShoppingBag, Instagram, Twitter, Github, Mail, Phone, MapPin } from 'lucide-react';

const sections = [
  {
    title: 'Shop',
    links: [
      { label: 'All Products',  to: '/shop' },
      { label: 'New Arrivals',  to: '/shop' },
      { label: 'Best Sellers',  to: '/shop' },
      { label: 'Sale',          to: '/shop' },
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'Our Story',    to: '/about-us' },
      { label: 'Contact',      to: '/contact' },
      { label: 'Careers',      to: '/about-us' },
      { label: 'Press',        to: '/about-us' },
    ]
  },
  {
    title: 'Help',
    links: [
      { label: 'Shipping',         to: '/contact' },
      { label: 'Returns',          to: '/contact' },
      { label: 'Privacy Policy',   to: '/contact' },
      { label: 'Terms of Service', to: '/contact' },
    ]
  },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-dark)', color: 'rgba(255,255,255,0.55)', borderTop: '1px solid #1c1c1c' }}>
      <div className="main-content" style={{ padding: '5rem 2.5rem 2.5rem' }}>

        {/* Grid */}
        <div className="footer-main-grid" style={{ display: 'grid', gridTemplateColumns: '1.75fr repeat(3, 1fr)', gap: '4rem', paddingBottom: '4rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>

          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* SVG Monogram mark — white version */}
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="28" height="28" rx="1" stroke="rgba(255,255,255,0.7)" strokeWidth="1" fill="none" transform="rotate(45 18 18)" />
                <rect x="7" y="7" width="22" height="22" rx="0.5" stroke="rgba(255,255,255,0.3)" strokeWidth="0.4" fill="none" transform="rotate(45 18 18)" />
                <path
                  d="M22 13.5 C22 11.6 20.4 10.5 18 10.5 C15.6 10.5 14 11.8 14 13.8 C14 15.6 15.2 16.4 17.5 17 L18.5 17.3 C20.8 17.9 22 18.8 22 20.8 C22 22.8 20.3 24 17.8 24 C15.3 24 13.5 22.8 13.5 21"
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <div style={{ lineHeight: 1 }}>
                <span style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 600, fontSize: '1.2rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'white', display: 'block' }}>
                  Shopzone
                </span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.48rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'block', marginTop: '2px' }}>
                  Est. 2025 · Premium
                </span>
              </div>
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.875rem', lineHeight: 1.8, maxWidth: 260, margin: 0 }}>
              Premium collections curated for the discerning individual. Quality and craft — delivered.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { Icon: Mail,   text: 'support@shopzone.com' },
                { Icon: Phone,  text: '+1 (555) 123-4567' },
                { Icon: MapPin, text: '123 Commerce St, Tech City' },
              ].map(({ Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>
                  <Icon size={13} strokeWidth={1.5} />
                  {text}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.875rem' }}>
              {[Instagram, Twitter, Github].map((Icon, i) => (
                <a key={i} href="#"
                  style={{ color: 'rgba(255,255,255,0.25)', transition: 'color var(--duration) var(--ease)' }}
                  onMouseOver={e => e.currentTarget.style.color = 'white'}
                  onMouseOut ={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}
                >
                  <Icon size={17} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav sections */}
          {sections.map(sec => (
            <div key={sec.title}>
              <p style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', marginBottom: '1.5rem' }}>
                {sec.title}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {sec.links.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to}
                      style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', transition: 'color var(--duration) var(--ease)' }}
                      onMouseOver={e => e.currentTarget.style.color = 'white'}
                      onMouseOut ={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2rem', fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em' }}>
          <span>© {new Date().getFullYear()} Shopzone. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link to="/contact" style={{ color: 'inherit' }}>Privacy</Link>
            <Link to="/contact" style={{ color: 'inherit' }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
