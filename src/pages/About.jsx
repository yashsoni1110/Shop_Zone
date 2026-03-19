import { motion } from 'framer-motion';
import { Users, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { value: '50K+',   label: 'Happy Customers' },
  { value: '100%',   label: 'Satisfaction Rate' },
  { value: '2,000+', label: 'Products Listed' },
  { value: '24/7',   label: 'Customer Support' },
];

const team = [
  { name: 'Alex Morgan',  role: 'Founder & CEO',      img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80' },
  { name: 'Priya Sharma', role: 'Head of Design',     img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&q=80' },
  { name: 'Jordan Lee',   role: 'Product Lead',       img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80' },
];

export default function About() {
  return (
    <div style={{ color: 'var(--text-main)' }}>

      {/* ── Hero ── */}
      <section style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-base)', padding: '6rem 2rem', textAlign: 'center' }}>
        <div className="main-content">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span style={{ display: 'inline-block', background: 'var(--bg-muted)', border: '1px solid var(--border-base)', borderRadius: '99px', padding: '0.25rem 0.875rem', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Our Story
            </span>
            <h1 style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '1.25rem' }}>
              Built for people who<br />care about quality.
            </h1>
            <p style={{ maxWidth: 560, margin: '0 auto', fontSize: '1.0625rem', lineHeight: 1.7 }}>
              Since 2024, ShopZone has been on a mission to make premium shopping accessible, transparent and enjoyable for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ borderBottom: '1px solid var(--border-base)' }}>
        <div className="main-content" style={{ padding: '3.5rem 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }}>
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 900, color: 'var(--text-main)', margin: '0 0 0.25rem' }}>{value}</p>
                <p style={{ fontSize: '0.875rem', margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section>
        <div className="main-content" style={{ padding: '5rem 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ marginBottom: '1.25rem' }}>Why we started ShopZone</h2>
              <p style={{ marginBottom: '1rem' }}>
                We noticed that online shopping was cluttered with low-quality products and confusing interfaces. We built ShopZone to be different — a clean, trusted marketplace where every product is verified and every experience is seamless.
              </p>
              <p style={{ marginBottom: '2rem' }}>
                Our team of designers, engineers and buyers work together daily to ensure the catalog stays fresh, the platform stays fast, and the service stays exceptional.
              </p>
              <Link to="/shop">
                <button className="btn-primary">Browse Our Collection</button>
              </Link>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ background: 'var(--bg-subtle)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-base)', height: 380 }}>
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                  alt="Our Team"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-base)' }}>
        <div className="main-content" style={{ padding: '5rem 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ marginBottom: '0.5rem' }}>Meet the Team</h2>
            <p>The people behind ShopZone.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {team.map(({ name, role, img }) => (
              <div key={name} style={{ textAlign: 'center' }}>
                <div style={{ width: 96, height: 96, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1rem', border: '2px solid var(--border-base)' }}>
                  <img src={img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.25rem' }}>{name}</h3>
                <p style={{ fontSize: '0.8125rem', margin: 0 }}>{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
