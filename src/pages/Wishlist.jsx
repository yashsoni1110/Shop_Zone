import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishlist, clearWishlist } from '../redux/wishlistSlice';
import { addToCart } from '../redux/cartSlice';
import { Heart, ShoppingBag, Trash2, ArrowRight, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function Wishlist() {
  const dispatch = useDispatch();
  const items = useSelector(s => s.wishlist.items);

  const handleMoveToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item.id));
    toast.success(`${item.title} moved to bag!`, {
      style: { background: '#0f172a', color: '#fff', borderRadius: '4px', fontSize: '0.875rem' },
    });
  };

  const handleRemove = (item) => {
    dispatch(removeFromWishlist(item.id));
    toast.success('Removed from wishlist', {
      style: { background: '#0f172a', color: '#fff', borderRadius: '4px', fontSize: '0.875rem' },
    });
  };

  if (items.length === 0) {
    return (
      <div className="loading-container" style={{ flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ width: 72, height: 72, background: 'var(--bg-muted)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Heart size={32} strokeWidth={1.5} color="var(--text-subtle)" />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.375rem' }}>Your wishlist is empty</h2>
          <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>Save items you love and come back to them anytime.</p>
          <Link to="/shop">
            <button className="btn-primary">Explore Products <ArrowRight size={15} /></button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content" style={{ padding: '2.5rem 2rem 5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', borderBottom: '1px solid var(--border-base)', paddingBottom: '1.25rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em', margin: 0 }}>
            My Wishlist
            <span style={{ fontWeight: 400, color: 'var(--text-subtle)', fontSize: '0.875rem', marginLeft: '0.5rem' }}>
              ({items.length} {items.length === 1 ? 'item' : 'items'})
            </span>
          </h1>
        </div>
        <button
          onClick={() => dispatch(clearWishlist())}
          className="btn-ghost"
          style={{ color: 'var(--accent-red)', fontSize: '0.8125rem' }}
        >
          <Trash2 size={14} /> Clear All
        </button>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '2rem' }}>
        <AnimatePresence>
          {items.map(item => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.2 }}
              style={{ position: 'relative' }}
            >
              {/* Remove X */}
              <button
                onClick={() => handleRemove(item)}
                style={{
                  position: 'absolute', top: '0.625rem', right: '0.625rem', zIndex: 10,
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'white', border: '1px solid var(--border-base)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'var(--text-subtle)',
                  transition: 'color var(--duration)',
                }}
                onMouseOver={e => e.currentTarget.style.color = 'var(--accent-red)'}
                onMouseOut={e => e.currentTarget.style.color = 'var(--text-subtle)'}
              >
                <X size={14} />
              </button>

              <Link to={`/product/${item.id}`} style={{ display: 'block', color: 'inherit' }}>
                {/* Image */}
                <div style={{ position: 'relative', paddingTop: '125%', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '0.875rem' }}>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Info */}
                <p style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-subtle)', margin: '0 0 0.2rem' }}>
                  {item.brand || item.category}
                </p>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.375rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '0.875rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '1rem' }}>${item.price}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-red)', fontWeight: 600 }}>
                    {Math.round(item.discountPercentage)}% off
                  </span>
                </div>
              </Link>

              <button
                onClick={() => handleMoveToCart(item)}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.6rem', fontSize: '0.8rem', gap: '0.4rem' }}
              >
                <ShoppingBag size={14} /> Move to Bag
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
