import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, ShoppingBag, Home, Phone, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { getCartCount } = useCart();
  const count = getCartCount();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <motion.div 
            whileHover={{ rotate: 10 }}
            style={{ 
              background: 'var(--gradient-main)', 
              borderRadius: '12px', 
              padding: '8px',
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)'
            }}
          >
            <ShoppingBag size={24} color="white" strokeWidth={2.5} />
          </motion.div>
          <span style={{ 
            fontSize: '1.5rem', 
            fontWeight: '800', 
            letterSpacing: '-0.03em',
            background: 'var(--gradient-main)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent' 
          }}>
            ShopZone
          </span>
        </Link>
        
        {/* Links */}
        <div className="navbar-links">
          <NavLink to="/" icon={<Home size={18} />} text="Home" active={isActive('/')} />
          <NavLink to="/shop" icon={<ShoppingBag size={18} />} text="Shop" active={isActive('/shop')} />
          <NavLink to="/about-us" icon={<Info size={18} />} text="About" active={isActive('/about-us')} />
          <NavLink to="/contact" icon={<Phone size={18} />} text="Contact" active={isActive('/contact')} />
          
          <div style={{ width: '1px', height: '24px', background: 'var(--border-light)', margin: '0 0.5rem' }} />

          {/* Cart */}
          <Link to="/cart" style={{ position: 'relative', textDecoration: 'none' }}>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                background: isActive('/cart') ? 'var(--gradient-main)' : 'rgba(255, 255, 255, 0.03)',
                padding: '0.6rem',
                borderRadius: '50%',
                display: 'flex',
                boxShadow: isActive('/cart') ? '0 0 20px var(--primary-glow)' : 'inset 0 0 0 1px var(--border-light)',
                transition: 'all 0.3s ease'
              }}
            >
              <ShoppingCart size={20} color={isActive('/cart') ? 'white' : 'var(--text-muted)'} />
              
              <AnimatePresence>
                {count > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-4px',
                      background: '#ef4444',
                      color: 'white',
                      borderRadius: '50%',
                      minWidth: '20px',
                      height: '20px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      padding: '0 4px'
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
        padding: '0.6rem 1.25rem',
        borderRadius: '9999px',
        color: active ? 'white' : 'var(--text-muted)',
        background: active ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
        border: active ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent'
      }}
      whileHover={{ 
        color: 'var(--text-main)',
        background: 'rgba(255, 255, 255, 0.03)'
      }}
    >
      {icon}
      <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>{text}</span>
    </motion.div>
  </Link>
);

export default Navbar;
