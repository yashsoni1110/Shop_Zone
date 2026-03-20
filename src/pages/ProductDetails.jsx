import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toggleWishlist } from '../redux/wishlistSlice';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Heart, Star, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

const guarantees = [
  { Icon: Truck,       text: 'Free shipping on orders over $50' },
  { Icon: ShieldCheck, text: '100% authentic — every item verified' },
  { Icon: RotateCcw,   text: 'Free returns within 30 days' },
];

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const wishlistItems = useSelector(s => s.wishlist.items);
  const isWishlisted  = product ? wishlistItems.some(i => i.id === product.id) : false;

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then(r => r.json())
      .then(d => { setProduct(d); setLoading(false); });
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Added to bag!", {
      style: { background: '#0f172a', color: '#fff', borderRadius: '4px', fontSize: '0.875rem' },
    });
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
    toast(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist ♡', {
      style: { background: '#0f172a', color: '#fff', borderRadius: '4px', fontSize: '0.875rem' },
    });
  };

  if (loading) return <div className="loading-container"><div className="loading-spinner" /></div>;
  if (!product) return (
    <div className="loading-container" style={{ flexDirection: 'column', gap: '1rem' }}>
      <h2>Product not found</h2>
      <Link to="/shop"><button className="btn-secondary">Back to Shop</button></Link>
    </div>
  );

  const strikethrough = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);

  return (
    <div className="main-content" style={{ padding: '2.5rem 2rem 5rem' }}>

      {/* Back */}
      <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '2rem' }}>
        <ArrowLeft size={16} /> Back to Shop
      </Link>

      <div className="product-details-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>

        {/* ── Image ── */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <div className="product-image-box" style={{ background: 'var(--bg-subtle)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-base)', overflow: 'hidden', height: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <motion.img
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4 }}
              src={product.thumbnail}
              alt={product.title}
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
            />
          </div>
          {/* Thumbnail strip */}
          {product.images?.length > 1 && (
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              {product.images.slice(0, 4).map((img, i) => (
                <div key={i} style={{ width: 60, height: 60, background: 'var(--bg-subtle)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-md)', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* ── Info ── */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>

          {/* Category + Brand */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ display: 'inline-block', background: 'var(--bg-muted)', border: '1px solid var(--border-base)', borderRadius: '99px', padding: '0.25rem 0.75rem', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
              {product.category}
            </span>
            {product.brand && (
              <span style={{ display: 'inline-block', background: 'var(--bg-muted)', border: '1px solid var(--border-base)', borderRadius: '99px', padding: '0.25rem 0.75rem', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
                {product.brand}
              </span>
            )}
          </div>

          <h1 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '0.875rem' }}>
            {product.title}
          </h1>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={14} fill={s <= Math.round(product.rating) ? '#f59e0b' : 'transparent'} color="#f59e0b" />
              ))}
            </div>
            <span style={{ fontWeight: 800 }}>{product.rating}</span>
            <span style={{ color: 'var(--text-subtle)' }}>({product.stock} in stock)</span>
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.75rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: 900 }}>${product.price}</span>
            {product.discountPercentage > 0 && (
              <>
                <span style={{ fontSize: '1.125rem', color: 'var(--text-subtle)', textDecoration: 'line-through' }}>${strikethrough}</span>
                <span style={{ display: 'inline-block', background: '#fef2f2', color: 'var(--accent-red)', borderRadius: '99px', padding: '0.125rem 0.625rem', fontSize: '0.75rem', fontWeight: 800 }}>
                  {Math.round(product.discountPercentage)}% OFF
                </span>
              </>
            )}
          </div>

          <p style={{ lineHeight: 1.8, marginBottom: '2rem' }}>{product.description}</p>

          {/* CTA row */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <button
              onClick={handleAddToCart}
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center', padding: '1rem', fontSize: '0.9375rem' }}
            >
              <ShoppingBag size={18} /> Add to Bag
            </button>
            <button
              onClick={handleWishlist}
              title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              style={{
                width: 52, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: isWishlisted ? '1.5px solid #e11d48' : '1px solid var(--border-strong)',
                borderRadius: 'var(--radius-md)',
                background: isWishlisted ? '#fff0f2' : 'transparent',
                cursor: 'pointer',
                transition: 'all var(--duration) var(--ease)',
              }}
            >
              <Heart
                size={20}
                strokeWidth={2}
                color={isWishlisted ? '#e11d48' : 'var(--text-muted)'}
                fill={isWishlisted ? '#e11d48' : 'transparent'}
              />
            </button>
          </div>

          {/* Guarantees */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px solid var(--border-base)', paddingTop: '1.5rem' }}>
            {guarantees.map(({ Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                <Icon size={16} strokeWidth={1.75} />
                {text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
