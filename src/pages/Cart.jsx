import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cartItems, removeFromCart, getCartTotal } = useCart();

  const handleCheckout = () => {
    toast.success('Proceeding to checkout!', {
      style: {
        background: 'rgba(30, 41, 59, 0.9)',
        color: '#fff',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)'
      }
    });
  };

  return (
    <div className="main-content">
      <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass" 
          style={{ 
            textAlign: 'center', 
            padding: '4rem', 
            borderRadius: '2rem',
            maxWidth: '600px',
            margin: '0 auto' 
          }}
        >
          <p style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>Looks like you haven't added anything yet.</p>
          <Link to="/shop">
            <button className="btn-primary">Start Shopping</button>
          </Link>
        </motion.div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Cart Items List */}
          <div style={{ gridColumn: 'span 2' }}>
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  key={item.id}
                  className="glass"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    marginBottom: '1rem',
                    gap: '1.5rem'
                  }}
                >
                  <div style={{ background: 'white', padding: '0.5rem', borderRadius: '0.5rem', width: '80px', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={item.thumbnail} alt={item.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>{item.title}</h3>
                    <p style={{ color: 'var(--text-muted)' }}>${item.price} x {item.quantity}</p>
                  </div>
                  
                  <div style={{ fontWeight: 'bold', fontSize: '1.25rem', minWidth: '80px', textAlign: 'right' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.1, color: '#ef4444' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromCart(item.id)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.5rem' }}
                  >
                    <Trash2 size={20} />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Checkout Summary */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass" 
              style={{ padding: '2rem', borderRadius: '1.5rem', position: 'sticky', top: '100px' }}
            >
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Order Summary</h2>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                <span>Shipping</span>
                <span style={{ color: '#10b981' }}>Free</span>
              </div>
              
              <div style={{ height: '1px', background: 'var(--glass-border)', margin: '1rem 0' }}></div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                <span>Total</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="btn-primary"
                style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontSize: '1.125rem', padding: '1rem' }}
              >
                Checkout <ArrowRight size={20} />
              </motion.button>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
