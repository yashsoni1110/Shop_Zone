import { Link } from 'react-router-dom';
import { ShoppingBag, Facebook, Twitter, Instagram, Linkedin, Send, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ 
      background: '#020617', 
      borderTop: '1px solid rgba(255, 255, 255, 0.05)', 
      padding: '5rem 0 2rem', 
      marginTop: 'auto',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decor */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        height: '1px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.5) 0%, transparent 70%)'
      }} />

      <div className="main-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem' }}>
        
        {/* Brand Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{ background: 'var(--gradient-main)', borderRadius: '10px', padding: '6px' }}>
              <ShoppingBag size={22} color="white" />
            </div>
            <span style={{ fontSize: '1.5rem', fontWeight: '800', background: 'var(--gradient-main)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ShopZone
            </span>
          </Link>
          <p style={{ lineHeight: '1.7', fontSize: '1rem', maxWidth: '300px' }}>
            Elevating your lifestyle with premium products. Quality, design, and innovation at your fingertips.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" style={{ 
                color: 'var(--text-muted)', 
                background: 'rgba(255,255,255,0.03)', 
                padding: '10px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(255,255,255,0.05)'
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.color = 'white'; 
                e.currentTarget.style.background = 'var(--primary)'; 
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.color = 'var(--text-muted)'; 
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'white' }}>Company</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {['About Us', 'Careers', 'Press', 'Blog'].map((link) => (
              <li key={link}>
                <Link to="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.95rem' }}
                  onMouseEnter={(e) => { e.target.style.color = 'var(--primary)'; e.target.style.paddingLeft = '5px'; }}
                  onMouseLeave={(e) => { e.target.style.color = 'var(--text-muted)'; e.target.style.paddingLeft = '0'; }}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'white' }}>Support</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {['Shipping Policy', 'Returns & Refunds', 'Privacy Policy', 'Terms of Service'].map((link) => (
              <li key={link}>
                <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'all 0.2s', fontSize: '0.95rem' }}
                   onMouseEnter={(e) => { e.target.style.color = 'var(--primary)'; e.target.style.paddingLeft = '5px'; }}
                   onMouseLeave={(e) => { e.target.style.color = 'var(--text-muted)'; e.target.style.paddingLeft = '0'; }}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info (New) */}
         <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'white' }}>Contact</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <li style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              <MapPin size={18} color="var(--primary)" />
              123 Innovation Dr, Tech City
            </li>
            <li style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              <Phone size={18} color="var(--primary)" />
              +1 (555) 123-4567
            </li>
            <li style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              <Mail size={18} color="var(--primary)" />
              support@shopzone.com
            </li>
          </ul>
        </div>
      </div>
      
      <div style={{ 
        maxWidth: '1400px', 
        margin: '4rem auto 0', 
        paddingTop: '2rem', 
        borderTop: '1px solid rgba(255,255,255,0.05)', 
        textAlign: 'center', 
        color: 'rgba(255,255,255,0.4)',
        fontSize: '0.875rem',
        paddingLeft: '2rem',
        paddingRight: '2rem'
      }}>
        <p>© {new Date().getFullYear()} ShopZone Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
