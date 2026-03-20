import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toggleWishlist } from '../redux/wishlistSlice';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const dispatch      = useDispatch();
  const wishlistItems = useSelector(s => s.wishlist.items);
  const isWishlisted  = wishlistItems.some(i => i.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
    toast.success("Added to bag", {
      style: { background: '#0a0a0a', color: '#fff', borderRadius: '2px', fontSize: '0.8rem', letterSpacing: '0.04em' },
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
    toast(isWishlisted ? 'Removed from wishlist' : 'Saved to wishlist', {
      style: { background: '#0a0a0a', color: '#fff', borderRadius: '2px', fontSize: '0.8rem', letterSpacing: '0.04em' },
    });
  };

  const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(0);

  return (
    <Link to={`/product/${product.id}`} style={{ display: 'block', color: 'inherit', minWidth: 0 }}>
      <motion.div whileHover="hover" style={{ minWidth: 0 }}>

        {/* ── Image ── */}
        <div style={{ position: 'relative', overflow: 'hidden', paddingTop: '133%', background: 'var(--bg-subtle)' }}>
          <motion.img
            variants={{ hover: { scale: 1.05 } }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            src={product.thumbnail}
            alt={product.title}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', objectFit: 'cover',
              filter: 'grayscale(30%)',
              transition: 'filter 0.4s ease',
            }}
            onMouseOver={e => e.currentTarget.style.filter = 'grayscale(0%)'}
            onMouseOut ={e => e.currentTarget.style.filter = 'grayscale(30%)'}
          />

          {/* Discount badge */}
          {product.discountPercentage >= 10 && (
            <span style={{
              position: 'absolute', top: '0.5rem', left: '0.5rem',
              background: 'var(--bg-dark)', color: 'white',
              fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.08em',
              padding: '2px 6px',
            }}>
              −{Math.round(product.discountPercentage)}%
            </span>
          )}

          {/* Top-right action buttons */}
          <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>

            {/* Wishlist — always visible */}
            <button
              onClick={handleWishlist}
              style={{
                width: 30, height: 30,
                background: 'rgba(255,255,255,0.92)', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'background var(--duration)',
                borderRadius: '50%',
              }}
              onMouseOver={e => e.currentTarget.style.background = 'white'}
              onMouseOut ={e => e.currentTarget.style.background = 'rgba(255,255,255,0.92)'}
            >
              <Heart size={13} strokeWidth={1.75}
                fill={isWishlisted ? '#e11d48' : 'transparent'}
                color={isWishlisted ? '#e11d48' : 'var(--text-muted)'}
              />
            </button>

            {/* Cart icon — mobile only */}
            <button
              className="mobile-only"
              onClick={handleAddToCart}
              style={{
                width: 30, height: 30,
                background: 'rgba(255,255,255,0.92)', border: 'none',
                display: 'none', /* overridden by .mobile-only CSS */
                alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'background var(--duration)',
                borderRadius: '50%',
              }}
              onMouseOver={e => e.currentTarget.style.background = 'white'}
              onMouseOut ={e => e.currentTarget.style.background = 'rgba(255,255,255,0.92)'}
            >
              <ShoppingBag size={13} strokeWidth={1.75} color="var(--text-main)" />
            </button>
          </div>

          {/* Add to bag — slides up on hover (desktop only) */}
          <motion.div
            className="desktop-only"
            variants={{ hover: { y: 0, opacity: 1 }, initial: { y: 12, opacity: 0 } }}
            initial="initial"
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'rgba(10,10,10,0.88)', backdropFilter: 'blur(4px)',
            }}
          >
            <button
              onClick={handleAddToCart}
              style={{
                width: '100%', padding: '0.75rem',
                background: 'transparent', border: 'none', color: 'white',
                fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
              }}
            >
              <ShoppingBag size={13} strokeWidth={2} /> Add to Bag
            </button>
          </motion.div>
        </div>

        {/* ── Info ── */}
        <div style={{ paddingTop: '0.625rem' }}>
          <p style={{ fontSize: '0.55rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-subtle)', margin: '0 0 0.2rem' }}>
            {product.brand || product.category}
          </p>
          <h3 style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-main)', margin: '0 0 0.35rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'Inter, sans-serif' }}>
            {product.title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>${product.price}</span>
            {product.discountPercentage >= 5 && (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', textDecoration: 'line-through' }}>${originalPrice}</span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
