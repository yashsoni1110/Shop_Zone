import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Clock } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const features = [
  { icon: Truck,       text: 'Complimentary delivery on orders over $50' },
  { icon: RotateCcw,   text: '30-day returns, no questions asked' },
  { icon: ShieldCheck, text: '100% authentic, every item verified' },
  { icon: Clock,       text: 'Dedicated customer care, 24/7' },
];

const categories = [
  { name: 'Women',       sub: 'Ready-to-wear',     img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80' },
  { name: 'Men',         sub: 'Tailoring & Casual', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80' },
  { name: 'Accessories', sub: 'Bags & Jewellery',   img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80' },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=8&skip=4')
      .then(r => r.json())
      .then(d => { setFeatured(d.products); setLoading(false); });
  }, []);

  return (
    <div style={{ background: 'var(--bg-main)' }}>

      {/* ══════════════════════════════════════
          HERO — full bleed editorial B&W
          ══════════════════════════════════════ */}
      <section style={{ position: 'relative', height: '92vh', overflow: 'hidden', background: '#1c1c1e' }}>
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=90"
          alt="Hero"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
            filter: 'grayscale(100%) contrast(1.05)',
            opacity: 0.7,
          }}
        />
        {/* gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(28,28,30,0.72) 0%, rgba(28,28,30,0.1) 65%)' }} />

        {/* Hero content */}
        <div className="main-content" style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '6rem' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="label" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1.25rem' }}>
              Spring / Summer 2025 Collection
            </p>
            <h1 style={{ color: 'white', maxWidth: 700, marginBottom: '2rem', fontWeight: 300 }}>
              Dress for the<br />
              <em style={{ fontStyle: 'italic', fontWeight: 300 }}>life you lead.</em>
            </h1>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/shop">
                <button className="btn-inverted" style={{ padding: '0.875rem 3rem' }}>
                  Explore Collection
                </button>
              </Link>
              <Link to="/about-us">
                <button style={{
                  background: 'transparent', color: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  padding: '0.875rem 2rem', fontSize: '0.75rem',
                  fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all var(--duration)',
                }}
                onMouseOver={e => { e.currentTarget.style.borderColor = 'white'; e.currentTarget.style.color = 'white'; }}
                onMouseOut ={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                >
                  Our Story
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* bottom scroll hint */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 2 }}>
          <div style={{ width: 1, height: 48, background: 'rgba(255,255,255,0.3)', margin: '0 auto' }} />
        </div>
      </section>

      {/* ══════════════════════════════════════
          EDITORIAL LINE
          ══════════════════════════════════════ */}
      <section style={{ borderBottom: '1px solid var(--border-base)', background: 'var(--bg-subtle)' }}>
        <div className="main-content" style={{ padding: '1.25rem 2.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0', borderLeft: '1px solid var(--border-base)' }}>
            {features.map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.5rem', borderRight: '1px solid var(--border-base)' }}>
                <Icon size={16} strokeWidth={1.5} color="var(--text-subtle)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CATEGORY EDITORIAL GRID
          ══════════════════════════════════════ */}
      <section>
        <div className="main-content" style={{ padding: '6rem 2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
            <div>
              <p className="label" style={{ marginBottom: '0.625rem' }}>Collections</p>
              <h2 style={{ fontWeight: 300 }}>Shop by Category</h2>
            </div>
            <Link to="/shop">
              <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.375rem', borderBottom: '1px solid var(--border-base)', paddingBottom: '2px', transition: 'color var(--duration)' }}
                onMouseOver={e => e.currentTarget.style.color = 'var(--text-main)'}
                onMouseOut ={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                View All <ArrowRight size={12} />
              </span>
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
            {categories.map((cat, i) => (
              <Link to="/shop" key={i}>
                <motion.div
                  whileHover="hover"
                  style={{ position: 'relative', overflow: 'hidden', aspectRatio: '0.8' }}
                >
                  <motion.img
                    variants={{ hover: { scale: 1.06 } }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    src={cat.img}
                    alt={cat.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(80%)' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.75rem' }}>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 0.25rem' }}>{cat.sub}</p>
                    <h3 style={{ color: 'white', fontFamily: '"Cormorant Garamond", serif', fontWeight: 300, fontSize: '1.75rem', margin: '0 0 0.75rem', letterSpacing: '0.02em' }}>{cat.name}</h3>
                    <motion.div
                      variants={{ hover: { x: 4 } }}
                      transition={{ duration: 0.2 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'white' }}
                    >
                      Shop Now <ArrowRight size={11} />
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MARQUEE STRIP
          ══════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-dark)', borderTop: '1px solid #1f1f1f', overflow: 'hidden', padding: '1rem 0' }}>
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'flex', gap: '4rem', whiteSpace: 'nowrap', width: 'max-content' }}
        >
          {Array(8).fill(['NEW ARRIVALS', '·', 'FREE SHIPPING', '·', 'SPRING 2025', '·', 'PREMIUM QUALITY', '·']).flat().map((t, i) => (
            <span key={i} style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: t === '·' ? 'var(--text-subtle)' : 'rgba(255,255,255,0.6)' }}>
              {t}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          FEATURED PRODUCTS
          ══════════════════════════════════════ */}
      <section>
        <div className="main-content" style={{ padding: '6rem 2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
            <div>
              <p className="label" style={{ marginBottom: '0.625rem' }}>Curated for You</p>
              <h2 style={{ fontWeight: 300 }}>New Arrivals</h2>
            </div>
            <Link to="/shop">
              <button className="btn-secondary">View Catalogue</button>
            </Link>
          </div>
          {loading ? (
            <div className="loading-container" style={{ minHeight: 240 }}><div className="loading-spinner" /></div>
          ) : (
            <div className="product-grid" style={{ gap: '2rem', rowGap: '4rem' }}>
              {featured.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════
          FULL BLEED PROMO BAND
          ══════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1800&q=80"
          alt="Promo"
          style={{ width: '100%', height: 480, objectFit: 'cover', opacity: 0.3, filter: 'grayscale(100%)' }}
        />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
          <p className="label" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>Limited Time</p>
          <h2 style={{ color: 'white', fontWeight: 300, fontSize: 'clamp(2rem,4vw,4rem)', marginBottom: '1.5rem' }}>
            Up to 50% off premium brands.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 480, marginBottom: '2.5rem', fontSize: '0.9375rem' }}>
            A curated selection of season-end pieces — now at their lowest prices.
          </p>
          <Link to="/shop">
            <button className="btn-inverted" style={{ padding: '0.875rem 3rem' }}>Shop the Sale</button>
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════
          NEWSLETTER
          ══════════════════════════════════════ */}
      <section style={{ borderTop: '1px solid var(--border-base)' }}>
        <div className="main-content" style={{ padding: '6rem 2.5rem' }}>
          <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
            <p className="label" style={{ marginBottom: '1rem' }}>Stay Informed</p>
            <h2 style={{ fontWeight: 300, marginBottom: '1.25rem' }}>
              The edit, delivered to your inbox.
            </h2>
            <p style={{ marginBottom: '2.5rem' }}>
              Subscribe for early access to new collections, exclusive member discounts and carefully curated editorial content.
            </p>
            <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', gap: '0', border: '1px solid var(--border-base)', maxWidth: 480, margin: '0 auto' }}>
              <input
                type="email"
                placeholder="Your email address"
                required
                style={{
                  flex: 1, padding: '0.875rem 1.25rem',
                  border: 'none', outline: 'none',
                  fontSize: '0.875rem', color: 'var(--text-main)',
                  background: 'transparent',
                }}
              />
              <button
                type="submit"
                className="btn-primary"
                style={{ flexShrink: 0, padding: '0.875rem 1.5rem', borderLeft: '1px solid var(--border-base)' }}
              >
                Subscribe
              </button>
            </form>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', marginTop: '1rem' }}>
              No spam. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
