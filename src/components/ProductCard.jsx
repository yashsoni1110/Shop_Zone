import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success('Added to cart', {
      position: 'bottom-right',
      style: {
        background: '#1e293b',
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.1)'
      }
    });
  };

  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <motion.div
        whileHover={{ y: -8 }}
        className="glass"
        style={{
          borderRadius: '1.5rem',
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          group: 'group' // enabling group hover
        }}
      >
        <div style={{ position: 'relative', paddingTop: '100%', background: 'white', overflow: 'hidden' }}>
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            src={product.thumbnail}
            alt={product.title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '1rem'
            }}
          />
          {/* Overlay Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ scale: 1.1 }}
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              background: 'var(--gradient-main)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              zIndex: 10
            }}
          >
            <ShoppingCart size={20} />
          </motion.button>
        </div>

        <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <h3 style={{ 
              fontSize: '1.1rem', 
              marginBottom: '0', 
              lineHeight: '1.4',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              flex: 1
            }}>
              {product.title}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', color: '#fbbf24' }}>
              <Star size={14} fill="currentColor" />
              <span>{product.rating}</span>
            </div>
          </div>
          
          <p style={{ 
            fontSize: '0.9rem', 
            color: 'var(--text-muted)', 
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: 'auto'
          }}>
            {product.description}
          </p>
          
          <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>
              ${product.price}
            </span>
            <span style={{ 
              fontSize: '0.8rem', 
              padding: '4px 12px', 
              borderRadius: '9999px', 
              background: 'rgba(99, 102, 241, 0.1)', 
              color: 'var(--primary)',
              fontWeight: '500'
            }}>
              {product.category}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
