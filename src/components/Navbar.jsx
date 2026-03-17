import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, ShoppingBag, Home, Phone, Info } from 'lucide-react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const count = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav 
      className={`navbar ${scrolled ? 'glass-heavy' : ''}`}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        height: scrolled ? '65px' : '80px',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        background: scrolled ? 'var(--bg-glass-heavy)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border-soft)' : '1px solid transparent'
      }}
    >
      <div className="navbar-container" style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <Link to="/" className="navbar-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <motion.div 
            whileHover={{ rotate: 5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              background: 'var(--gradient-base)', 
              borderRadius: '10px', 
              padding: '6px',
              display: 'flex',
              boxShadow: '0 4px 12px rgba(129, 140, 248, 0.4)'
            }}
          >
            <ShoppingBag size={20} color="white" />
          </motion.div>
          <span style={{ 
            fontSize: '1.4rem', 
            fontWeight: '800', 
            letterSpacing: '-0.03em',
            background: 'var(--gradient-base)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent' 
          }}>
            ShopZone
          </span>
        </Link>
        
        {/* Navigation Links */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <NavLink to="/" icon={<Home size={16} />} text="Home" active={isActive('/')} />
            <NavLink to="/shop" icon={<ShoppingBag size={16} />} text="Shop" active={isActive('/shop')} />
            <NavLink to="/about-us" icon={<Info size={16} />} text="About" active={isActive('/about-us')} />
            <NavLink to="/contact" icon={<Phone size={16} />} text="Contact" active={isActive('/contact')} />
          </div>
          
          <div style={{ width: '1px', height: '20px', background: 'var(--border-soft)', margin: '0 0.5rem' }} />

          {/* Cart Interaction */}
          <Link to="/cart" style={{ position: 'relative', textDecoration: 'none' }}>
            <motion.div 
              whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.08)' }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                background: isActive('/cart') ? 'var(--primary)' : 'rgba(255, 255, 255, 0.03)',
                padding: '0.6rem',
                borderRadius: '50%',
                display: 'flex',
                boxShadow: isActive('/cart') ? '0 4px 15px var(--primary-glow)' : 'none',
                transition: 'all 0.3s ease',
                border: '1px solid var(--border-soft)'
              }}
            >
              <ShoppingCart size={18} color={isActive('/cart') ? 'white' : 'var(--text-secondary)'} />
              
              <AnimatePresence>
                {count > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      right: '-2px',
                      background: 'var(--accent-rose)',
                      color: 'white',
                      borderRadius: '50%',
                      minWidth: '18px',
                      height: '18px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '0.65rem',
                      fontWeight: '800',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                      padding: '0 2px',
                      border: '2px solid var(--bg-deep)'
                    }}
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, text, active }) => (
  <Link to={to} style={{ textDecoration: 'none', position: 'relative' }}>
    <motion.div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        borderRadius: '9999px',
        color: active ? 'white' : 'var(--text-secondary)',
        background: active ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
        transition: 'all 0.3s ease'
      }}
      whileHover={{ 
        color: 'white',
        background: 'rgba(255, 255, 255, 0.08)',
      }}
    >
      <span style={{ opacity: active ? 1 : 0.7, display: 'flex' }}>{icon}</span>
      <span style={{ fontWeight: active ? 700 : 500, fontSize: '0.9rem' }}>{text}</span>
      {active && (
        <motion.div 
          layoutId="nav-active"
          style={{
            position: 'absolute',
            bottom: '0',
            left: '25%',
            right: '25%',
            height: '2px',
            background: 'var(--primary)',
            borderRadius: '2px',
            boxShadow: '0 0 10px var(--primary)'
          }}
        />
      )}
    </motion.div>
  </Link>
);

export default Navbar;
