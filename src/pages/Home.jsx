import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, TrendingUp, Smartphone, Home as HomeIcon, Shirt, Zap, ShieldCheck, Truck, Clock, Sparkles, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=8&skip=10')
      .then(res => res.json())
      .then(data => setFeaturedProducts(data.products));
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="home-container" style={{ overflowX: 'hidden' }}>
      
      {/* Cinematic Hero Section - Reduced height for better organization */}
      <section style={{ 
        minHeight: '90vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'relative',
        padding: '0 2rem',
        marginTop: '-85px',
        background: 'radial-gradient(circle at 50% 50%, rgba(129, 140, 248, 0.15) 0%, transparent 60%)'
      }}>
        {/* Animated Background Elements */}
        <motion.div style={{ y: y1, opacity }} className="hero-decor">
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '40vw',
            height: '40vw',
            background: 'radial-gradient(circle, rgba(129, 140, 248, 0.15) 0%, transparent 60%)',
            filter: 'blur(100px)',
            borderRadius: '50%',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            width: '35vw',
            height: '35vw',
            background: 'radial-gradient(circle, rgba(192, 132, 252, 0.15) 0%, transparent 60%)',
            filter: 'blur(100px)',
            borderRadius: '50%',
          }} />
        </motion.div>

        <div className="main-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '1000px', position: 'relative', zIndex: 10 }}>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px', 
              background: 'var(--primary-glow)', 
              color: 'white', 
              padding: '8px 20px', 
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 800,
              marginBottom: '1.5rem',
              border: '1px solid var(--border-soft)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
            }}>
              <Sparkles size={16} fill="white" />
              <span style={{ letterSpacing: '1.5px', textTransform: 'uppercase' }}>New Season Arrival</span>
            </div>

            <h1 style={{ marginBottom: '1.5rem', textShadow: '0 10px 40px rgba(0,0,0,0.4)' }}>
              Elevate Your <br />
              <span className="text-gradient">Daily Existence.</span>
            </h1>
            
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '650px', margin: '0 auto 3rem auto', lineHeight: '1.6', fontWeight: 500 }}>
              Discover a meticulously curated collection where cutting-edge innovation meets timeless elegance. Designed for those who demand excellence.
            </p>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/shop" style={{ textDecoration: 'none' }}>
                <button className="btn-primary" style={{ padding: '1rem 3.5rem', fontSize: '1.1rem' }}>
                  Shop Collection <ArrowRight size={20} />
                </button>
              </Link>
              <Link to="/about-us" style={{ textDecoration: 'none' }}>
                <button className="btn-secondary" style={{ padding: '1rem 3.5rem', fontSize: '1.1rem' }}>
                  Our Vision
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges - More Compact */}
      <div className="main-content" style={{ marginTop: '-4rem', position: 'relative', zIndex: 20 }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-heavy"
          style={{ 
            borderRadius: '2rem', 
            padding: '2.5rem 2rem',
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '2.5rem',
            textAlign: 'center',
            border: '1px solid var(--border-soft)'
          }}
        >
          {[
            { title: 'Authenticated', desc: '100% Genuine Prods', icon: <ShieldCheck size={32} color="var(--accent-emerald)" /> },
            { title: 'Global Shipping', desc: 'Fast track delivery', icon: <Truck size={32} color="var(--primary)" /> },
            { title: 'Concierge', desc: '24/7 Expert support', icon: <Clock size={32} color="var(--accent-gold)" /> },
            { title: 'Secure Pay', desc: 'Fully encrypted', icon: <Zap size={32} color="var(--secondary)" /> }
          ].map((feature, i) => (
            <div key={i}>
              <div style={{ marginBottom: '1rem' }}>{feature.icon}</div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.4rem', color: 'white', fontWeight: 700 }}>{feature.title}</h4>
              <p style={{ fontSize: '0.85rem' }}>{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Category Showcase - Better Organization */}
      <section className="section-padding">
        <div className="main-content">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <h2 style={{ marginBottom: '0.75rem' }}>Curated Selections</h2>
            <p style={{ maxWidth: '550px', margin: '0 auto' }}>Explore hand-picked arrivals from around the globe.</p>
          </motion.div>

          <motion.div 
            className="categories-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}
          >
            {[
              { name: 'Technology', icon: <Smartphone size={36} />, color: '#818cf8', link: '/shop?cat=smartphones', desc: 'Precision engineering' },
              { name: 'Sanctuary', icon: <HomeIcon size={36} />, color: '#34d399', link: '/shop?cat=home-decoration', desc: 'Refining your space' },
              { name: 'Couture', icon: <Shirt size={36} />, color: '#fb7185', link: '/shop?cat=mens-shirts', desc: 'The modern silhouette' },
              { name: 'Essentials', icon: <ShoppingBag size={36} />, color: '#c084fc', link: '/shop', desc: 'Perfected essentials' }
            ].map((cat, i) => (
              <Link to={cat.link} key={i} style={{ textDecoration: 'none', color: 'inherit' }}>
                <motion.div 
                  variants={fadeInUp}
                  whileHover={{ y: -8, background: 'rgba(255,255,255,0.04)' }}
                  className="glass"
                  style={{ 
                    padding: '2rem', 
                    borderRadius: '1.5rem', 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '220px',
                    border: '1px solid var(--border-soft)'
                  }}
                >
                  <div style={{ 
                    background: `${cat.color}15`, 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '16px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    color: cat.color,
                    border: `1px solid ${cat.color}30`
                  }}>
                    {cat.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'white' }}>{cat.name}</h3>
                    <p style={{ fontSize: '0.9rem' }}>{cat.desc}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Arrivals Grid */}
      <section className="section-padding" style={{ position: 'relative', paddingTop: '2rem' }}>
         <div style={{ position: 'absolute', top: '20%', right: '0', width: '300px', height: '600px', background: 'var(--primary-glow)', filter: 'blur(150px)', opacity: 0.1, zIndex: -1 }} />

        <div className="main-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 style={{ marginBottom: '0.5rem' }}>Trending Now</h2>
              <p>Top-tier selections gaining momentum.</p>
            </motion.div>
            <Link to="/shop" style={{ textDecoration: 'none' }}>
              <button className="btn-secondary" style={{ padding: '0.7rem 1.75rem', fontSize: '0.9rem' }}>
                View Catalog <ArrowRight size={18} />
              </button>
            </Link>
          </div>

          <motion.div 
            className="product-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="section-padding" style={{ marginBottom: '3rem' }}>
        <div className="main-content">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass"
            style={{ 
              borderRadius: '2rem', 
              padding: '4rem 2rem',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.1) 0%, rgba(192, 132, 252, 0.1) 100%)',
              border: '1px solid var(--border-soft)'
            }}
          >
            <h2 style={{ marginBottom: '1rem' }}>Join the Inner Circle</h2>
            <p style={{ maxWidth: '550px', margin: '0 auto 2.5rem auto', fontSize: '1.1rem' }}>
              Subscribe for early-access collections and premium member benefits.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', maxWidth: '550px', margin: '0 auto' }}>
              <input 
                type="email" 
                placeholder="Professional email address" 
                style={{ 
                  flex: 1, 
                  background: 'rgba(255,255,255,0.03)', 
                  border: '1px solid var(--border-soft)', 
                  padding: '1rem 1.5rem', 
                  borderRadius: '1rem',
                  color: 'white',
                  fontSize: '1rem',
                  outline: 'none'
                }} 
              />
              <button className="btn-primary" style={{ padding: '1rem 2.5rem' }}>Join Now</button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
