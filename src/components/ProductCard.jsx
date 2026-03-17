import { motion } from 'framer-motion';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`, {
      style: {
        background: 'var(--bg-glass-heavy)',
        color: 'white',
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--border-soft)',
        borderRadius: '16px'
      },
      icon: <ShoppingCart size={20} color="var(--primary-light)" />,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass clickable"
      style={{
        borderRadius: '2rem',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative'
      }}
    >
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'relative', paddingTop: '100%', overflow: 'hidden', background: 'rgba(255,255,255,0.01)' }}>
          <motion.img 
            whileHover={{ scale: 1.1, rotate: -2 }}
            src={product.thumbnail} 
            alt={product.title} 
            style={{ 
              position: 'absolute', 
              top: '10%', 
              left: '10%', 
              width: '80%', 
              height: '80%', 
              objectFit: 'contain',
            }} 
          />
          
          {/* Rating Label */}
          <div style={{ 
            position: 'absolute', 
            top: '1.25rem', 
            right: '1.25rem', 
            background: 'rgba(15, 23, 42, 0.8)', 
            backdropFilter: 'blur(8px)',
            color: 'white', 
            padding: '6px 12px', 
            borderRadius: '1rem', 
            fontSize: '0.85rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: '1px solid var(--accent-gold)'
          }}>
            <Star size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />
            {product.rating}
          </div>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              position: 'absolute',
              top: '1.25rem',
              left: '1.25rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-soft)',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Heart size={18} />
          </motion.button>
        </div>

        <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-light)', letterSpacing: '2px' }}>
            {product.category}
          </div>
          <h3 style={{ fontSize: '1.25rem', lineHeight: '1.3', flex: 1 }}>{product.title}</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
            <div>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white' }}>${product.price}</span>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              style={{ 
                background: 'var(--gradient-base)', 
                border: 'none', 
                width: '56px', 
                height: '56px', 
                borderRadius: '1.25rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                cursor: 'pointer',
                color: 'white',
                boxShadow: '0 8px 16px var(--primary-glow)'
              }}
            >
              <ShoppingCart size={24} />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
