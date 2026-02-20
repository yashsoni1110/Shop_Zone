import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, TrendingUp, Smartphone, Home as HomeIcon, Shirt, Zap, ShieldCheck, Truck, Clock } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=8&skip=10') // Fetching more items for a better grid
      .then(res => res.json())
      .then(data => setFeaturedProducts(data.products));
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="home-container" style={{ overflowX: 'hidden' }}>
      
      {/* Hero Section */}
      <section style={{ 
        minHeight: '90vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'relative',
        padding: '0 2rem',
        marginTop: '-80px', // Pull up behind navbar if transparent
        paddingTop: '80px'
      }}>
        {/* Abstract Background Elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          zIndex: -1,
          filter: 'blur(80px)',
          borderRadius: '50%',
          animation: 'pulse 10s infinite alternate'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
          zIndex: -1,
          filter: 'blur(80px)',
          borderRadius: '50%',
          animation: 'pulse 12s infinite alternate-reverse'
        }} />

        <div className="main-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '1000px' }}>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              background: 'rgba(255, 255, 255, 0.05)', 
              color: 'var(--text-light)', 
              padding: '8px 20px', 
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}>
              <Zap size={16} className="text-gradient" />
              <span>The Future of Shopping is Here</span>
            </div>

            <h1 style={{ marginBottom: '1.5rem' }}>
              Experience the <br />
              <span className="text-gradient">Epiphany of Luxury.</span>
            </h1>
            
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: '1.6' }}>
              Curated collections that define sophistication. Upgrade your lifestyle with our premium selection of technology, fashion, and home essentials.
            </p>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/shop" style={{ textDecoration: 'none' }}>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                  style={{ padding: '1rem 3rem', fontSize: '1.125rem' }}
                >
                  Explore Collection
                </motion.button>
              </Link>
              <Link to="/about-us" style={{ textDecoration: 'none' }}>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary"
                  style={{ padding: '1rem 3rem', fontSize: '1.125rem' }}
                >
                  Our Story
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section - Clean & Geometric */}
      <section className="section-padding">
        <div className="main-content">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2>Curated Categories</h2>
            <p>Explore our wide range of premium products.</p>
          </motion.div>

          <motion.div 
            className="categories-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              { name: 'Technology', icon: <Smartphone size={32} />, color: '#3b82f6', link: '/shop?cat=smartphones', desc: 'Latest gadgets & devices' },
              { name: 'Home & Living', icon: <HomeIcon size={32} />, color: '#10b981', link: '/shop?cat=home-decoration', desc: 'Decor for modern homes' },
              { name: 'Fashion', icon: <Shirt size={32} />, color: '#f43f5e', link: '/shop?cat=mens-shirts', desc: 'Trending styles for all' },
              { name: 'Trending', icon: <TrendingUp size={32} />, color: '#8b5cf6', link: '/shop', desc: 'What everyone is buying' }
            ].map((cat, i) => (
              <Link to={cat.link} key={i} style={{ textDecoration: 'none', color: 'inherit' }}>
                <motion.div 
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="glass"
                  style={{ 
                    padding: '2.5rem', 
                    borderRadius: '1.5rem', 
                    textAlign: 'left',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '200px'
                  }}
                >
                  <div style={{ 
                    background: 'rgba(255,255,255,0.05)', 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '16px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    color: cat.color,
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}>
                    {cat.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{cat.name}</h3>
                    <p style={{ fontSize: '0.9rem', marginBottom: '0' }}>{cat.desc}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.2) 80%, transparent)' }}>
        <div className="main-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2>New Arrivals</h2>
              <p>Freshly stocked premium items.</p>
            </div>
            <Link to="/shop" style={{ textDecoration: 'none' }}>
              <motion.div 
                whileHover={{ x: 5 }}
                style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--primary)', fontWeight: '600' }}
              >
                View Collection <ArrowRight size={20} />
              </motion.div>
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
               <motion.div key={product.id} variants={fadeInUp}>
                 <ProductCard product={product} />
               </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Signals */}
      <div className="main-content section-padding">
        <motion.div 
          className="glass"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ 
            borderRadius: '2rem', 
            padding: '4rem 2rem',
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '3rem',
            textAlign: 'center',
            background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.4) 0%, rgba(30, 41, 59, 0.1) 100%)'
          }}
        >
          {[
            { title: 'Premium Quality', desc: 'Verified authenticity', icon: <ShieldCheck size={40} /> },
            { title: 'Express Delivery', desc: 'Within 24 hours', icon: <Truck size={40} /> },
            { title: '24/7 Support', desc: 'Instant response', icon: <Clock size={40} /> },
            { title: 'Secure Payment', desc: 'Encrypted transactions', icon: <Zap size={40} /> }
          ].map((feature, i) => (
            <motion.div key={i} whileHover={{ y: -5 }}>
              <div style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
              <p style={{ fontSize: '0.9rem' }}>{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
