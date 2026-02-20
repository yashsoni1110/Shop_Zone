import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Star, Truck, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} added to cart!`, {
      style: {
        background: 'rgba(30, 41, 59, 0.9)',
        color: '#fff',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)'
      },
      iconTheme: {
        primary: '#6366f1',
        secondary: '#fff',
      },
    });
  };

  if (loading) return <div className="loading-spinner"></div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="main-content">
      <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'var(--text-muted)', marginBottom: '2rem' }}>
        <ArrowLeft size={20} /> Back to Shop
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
        {/* Image Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ position: 'relative' }}
        >
          <div className="glass" style={{ 
            padding: '2rem', 
            borderRadius: '2rem', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            height: '500px',
            background: 'white'
          }}>
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
            />
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ 
              background: 'rgba(99, 102, 241, 0.1)', 
              color: 'var(--primary)', 
              padding: '0.25rem 0.75rem', 
              borderRadius: '9999px', 
              fontSize: '0.875rem', 
              fontWeight: '600',
              textTransform: 'uppercase'
            }}>
              {product.category}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#f59e0b', fontWeight: 'bold' }}>
              <Star size={16} fill="currentColor" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h1 style={{ fontSize: '3rem', lineHeight: '1.2', marginBottom: '1.5rem', background: 'none', WebkitTextFillColor: 'var(--text-main)' }}>
            {product.title}
          </h1>

          <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '2rem' }}>
            {product.description}
          </p>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '2rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
              ${product.price}
            </span>
            {product.discountPercentage > 0 && (
              <span style={{ color: 'var(--text-muted)', textDecoration: 'line-through', fontSize: '1.25rem' }}>
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="btn-primary"
            style={{ 
              width: '100%', 
              padding: '1.25rem', 
              fontSize: '1.25rem', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: '0.75rem',
              marginBottom: '2rem'
            }}
          >
            <ShoppingCart /> Add to Cart
          </motion.button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="glass" style={{ padding: '1rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '0.75rem', borderRadius: '50%' }}>
                <Truck size={24} color="var(--primary)" />
              </div>
              <div>
                <div style={{ fontWeight: '600' }}>Free Delivery</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Orders over $50</div>
              </div>
            </div>
            <div className="glass" style={{ padding: '1rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '0.75rem', borderRadius: '50%' }}>
                <Shield size={24} color="var(--primary)" />
              </div>
              <div>
                <div style={{ fontWeight: '600' }}>Secure Payment</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>100% Protected</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;
