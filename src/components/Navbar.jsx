import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Search, X, Menu } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm } from '../redux/filterSlice';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const dispatch       = useDispatch();
  const navigate       = useNavigate();
  const cartItems      = useSelector(s => s.cart.items);
  const wishlistItems  = useSelector(s => s.wishlist.items);
  const cartCount      = cartItems.reduce((a, i) => a + (i.quantity || 1), 0);
  const wishCount      = wishlistItems.length;
  const { pathname }   = useLocation();

  const [searchOpen, setSearchOpen]     = useState(false);
  const [mobileMenuOpen, setMobileMenu] = useState(false);
  const [query, setQuery]               = useState('');
  const [fontsLoaded, setFontsLoaded]   = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchOpen && inputRef.current) inputRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => setFontsLoaded(true));
    } else {
      setFontsLoaded(true);
    }
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileMenu(false); }, [pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    dispatch(setSearchTerm(query.trim()));
    navigate('/shop');
    setSearchOpen(false);
    setQuery('');
  };

  const handleClose = () => {
    setSearchOpen(false);
    setQuery('');
    dispatch(setSearchTerm(''));
  };

  const links = [
    { label: 'Shop',    to: '/shop' },
    { label: 'About',   to: '/about-us' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.55)',
        backdropFilter: 'blur(22px) saturate(180%)',
        WebkitBackdropFilter: 'blur(22px) saturate(180%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.45)',
        borderTop: '1px solid rgba(255, 255, 255, 0.7)',
        boxShadow: '0 4px 24px rgba(28, 28, 30, 0.07), inset 0 1px 0 rgba(255,255,255,0.8)',
      }}>
        <nav className="main-content" style={{
          display: 'flex',
          alignItems: 'center',
          height: '64px',
          gap: '1rem',
        }}>

          {/* ── LEFT: Logo ── */}
          <Link to="/" style={{
            textDecoration: 'none',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            opacity: fontsLoaded ? 1 : 0,
            transform: fontsLoaded ? 'translateY(0)' : 'translateY(4px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease'
          }}>
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="28" height="28" rx="1" stroke="#0a0a0a" strokeWidth="2" fill="none" transform="rotate(45 18 18)" />
              <rect x="7" y="7" width="22" height="22" rx="0.5" stroke="#0a0a0a" strokeWidth="0.8" fill="none" transform="rotate(45 18 18)" />
              <path
                d="M22 13.5 C22 11.6 20.4 10.5 18 10.5 C15.6 10.5 14 11.8 14 13.8 C14 15.6 15.2 16.4 17.5 17 L18.5 17.3 C20.8 17.9 22 18.8 22 20.8 C22 22.8 20.3 24 17.8 24 C15.3 24 13.5 22.8 13.5 21"
                stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" fill="none"
              />
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontWeight: 1000, fontSize: '1.2rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--text-main)', display: 'block',
              }}>
                Shopzone
              </span>
              <span className="desktop-only" style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500, fontSize: '0.48rem',
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: 'var(--text-subtle)', display: 'block', marginTop: '2px',
              }}>
                Est. 2025 · Premium
              </span>
            </div>
          </Link>

          {/* ── CENTRE: Nav links (desktop only) ── */}
          <div className="nav-desktop-links" style={{ display: 'flex', alignItems: 'center', gap: '0.125rem', flex: 1 }}>
            {links.map(({ label, to }) => {
              const active = pathname === to;
              return (
                <Link key={to} to={to}
                  style={{
                    padding: '0.375rem 0.875rem',
                    fontSize: '0.7rem', fontWeight: 600,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: active ? 'var(--text-main)' : 'var(--text-muted)',
                    borderBottom: active ? '1px solid var(--text-main)' : '1px solid transparent',
                    paddingBottom: '0.375rem',
                    transition: 'color var(--duration) var(--ease), border-color var(--duration) var(--ease)',
                  }}
                  onMouseOver={e => { if (!active) e.currentTarget.style.color = 'var(--text-main)'; }}
                  onMouseOut ={e => { if (!active) e.currentTarget.style.color = 'var(--text-muted)'; }}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Spacer on mobile */}
          <div style={{ flex: 1 }} className="mobile-spacer" />

          {/* ── RIGHT: Icons ── */}
          <div className="nav-actions-row" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0 }}>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(o => !o)}
              style={{
                width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: searchOpen ? 'var(--bg-muted)' : 'transparent',
                border: 'none', borderRadius: 'var(--radius-md)',
                color: searchOpen ? 'var(--text-main)' : 'var(--text-muted)',
                cursor: 'pointer', transition: 'all var(--duration) var(--ease)',
              }}
              onMouseOver={e => { if (!searchOpen) { e.currentTarget.style.background = 'var(--bg-muted)'; e.currentTarget.style.color = 'var(--text-main)'; }}}
              onMouseOut ={e => { if (!searchOpen) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}}
              aria-label="Search"
            >
              {searchOpen ? <X size={17} strokeWidth={1.75} /> : <Search size={17} strokeWidth={1.75} />}
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" title="Wishlist"
              style={{
                width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: wishCount > 0 ? '#e11d48' : 'var(--text-muted)',
                borderRadius: 'var(--radius-md)',
                transition: 'all var(--duration) var(--ease)',
              }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(225,29,72,0.08)'; e.currentTarget.style.color = '#e11d48'; }}
              onMouseOut ={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = wishCount > 0 ? '#e11d48' : 'var(--text-muted)'; }}
            >
              <Heart size={19} strokeWidth={1.75} fill={wishCount > 0 ? '#e11d48' : 'transparent'} color="currentColor" />
            </Link>

            {/* Cart icon (mobile) / Bag button (desktop) */}
            <Link to="/cart" style={{ display: 'flex', alignItems: 'center' }}>
              {/* Mobile: icon only */}
              <span className="mobile-only" style={{
                display: 'none',
                width: 36, height: 36,
                alignItems: 'center', justifyContent: 'center',
                position: 'relative',
                color: 'var(--text-muted)',
              }}>
                <ShoppingBag size={19} strokeWidth={1.75} />
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute', top: 4, right: 2,
                    background: 'var(--brand)', color: 'white',
                    borderRadius: '99px', minWidth: 15, height: 15,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.5rem', fontWeight: 900,
                  }}>
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </span>

              {/* Desktop: full Bag button */}
              <span className="desktop-only" style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.45rem 1.125rem',
                background: 'var(--brand)', color: 'white',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.65rem', fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'background var(--duration) var(--ease)',
              }}
              onMouseOver={e => e.currentTarget.style.background = 'var(--brand-hover)'}
              onMouseOut ={e => e.currentTarget.style.background = 'var(--brand)'}
              >
                <ShoppingBag size={14} strokeWidth={2} />
                Bag
                {cartCount > 0 && (
                  <span style={{
                    background: 'white', color: 'var(--brand)',
                    borderRadius: '99px', minWidth: 16, height: 16,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.55rem', fontWeight: 900, paddingInline: '2px',
                  }}>
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </span>
            </Link>

            {/* Hamburger — mobile only */}
            <button
              className="nav-hamburger"
              onClick={() => setMobileMenu(true)}
              style={{
                display: 'none', // shown via CSS
                width: 36, height: 36,
                alignItems: 'center', justifyContent: 'center',
                background: 'transparent', border: 'none',
                color: 'var(--text-main)', cursor: 'pointer',
                borderRadius: 'var(--radius-md)',
              }}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

          </div>
        </nav>
      </header>

      {/* ── MOBILE MENU OVERLAY ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 1100,
              background: 'var(--bg-main)',
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{
              height: 64, display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', padding: '0 1.25rem',
              borderBottom: '1px solid var(--border-base)',
            }}>
              <span style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontWeight: 700, fontSize: '1.1rem',
                letterSpacing: '0.15em', textTransform: 'uppercase',
              }}>Menu</span>
              <button
                onClick={() => setMobileMenu(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem', color: 'var(--text-main)' }}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Nav Links */}
            <div style={{ display: 'flex', flexDirection: 'column', padding: '2rem 1.5rem', gap: '0.25rem', flex: 1 }}>
              {links.map(({ label, to }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                >
                  <Link
                    to={to}
                    onClick={() => setMobileMenu(false)}
                    style={{
                      display: 'block',
                      fontSize: '2rem',
                      fontFamily: '"Cormorant Garamond", serif',
                      color: pathname === to ? 'var(--text-main)' : 'var(--text-muted)',
                      fontWeight: pathname === to ? 600 : 400,
                      padding: '0.75rem 0',
                      borderBottom: '1px solid var(--border-light)',
                    }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              {/* Extra links */}
              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <Link to="/wishlist" onClick={() => setMobileMenu(false)}
                  style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Wishlist {wishCount > 0 && `(${wishCount})`}
                </Link>
                <Link to="/cart" onClick={() => setMobileMenu(false)}
                  style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Cart {cartCount > 0 && `(${cartCount})`}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SEARCH OVERLAY PANEL ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            key="search-panel"
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0, zIndex: 999,
              background: 'white',
              borderBottom: '1px solid var(--border-base)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div className="main-content" style={{ padding: '1.25rem 1.5rem' }}>
              <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                <Search size={18} strokeWidth={1.5} color="var(--text-subtle)" style={{ flexShrink: 0, marginRight: '0.875rem' }} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search products…"
                  className="search-overlay-input"
                  style={{
                    flex: 1, border: 'none', outline: 'none',
                    fontSize: '1.125rem',
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontWeight: 400, color: 'var(--text-main)',
                    background: 'transparent', letterSpacing: '0.02em',
                  }}
                />
                {query && (
                  <button type="button" onClick={() => setQuery('')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-subtle)', padding: '0.25rem', marginRight: '0.75rem' }}
                  >
                    <X size={16} />
                  </button>
                )}
                <button type="submit" className="btn-primary desktop-only" style={{ flexShrink: 0, padding: '0.625rem 1.5rem' }}>
                  Search
                </button>
              </form>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.675rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-subtle)', paddingTop: '0.2rem' }}>
                  Popular:
                </span>
                {['Smartphones', 'Laptops', 'Skincare', 'Watches', 'Bags'].map(term => (
                  <button
                    key={term}
                    onClick={() => {
                      dispatch(setSearchTerm(term));
                      navigate('/shop');
                      setSearchOpen(false);
                      setQuery('');
                    }}
                    style={{
                      background: 'var(--bg-muted)', border: '1px solid var(--border-base)',
                      borderRadius: '99px', padding: '0.2rem 0.875rem',
                      fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)',
                      cursor: 'pointer', transition: 'all var(--duration) var(--ease)',
                    }}
                    onMouseOver={e => { e.currentTarget.style.background = 'var(--brand)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--brand)'; }}
                    onMouseOut ={e => { e.currentTarget.style.background = 'var(--bg-muted)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-base)'; }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dim backdrop for search */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            style={{
              position: 'fixed', inset: 0, top: 64,
              background: 'rgba(28,28,30,0.25)',
              zIndex: 998, backdropFilter: 'blur(2px)',
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
