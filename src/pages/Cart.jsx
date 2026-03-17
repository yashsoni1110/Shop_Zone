import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ShieldCheck, Truck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="main-content" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass"
          style={{ padding: '4rem 2rem', borderRadius: '2rem', textAlign: 'center', maxWidth: '500px' }}
        >
          <div style={{ background: 'var(--primary-glow)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <ShoppingCart size={36} color="var(--primary)" />
          </div>
          <h2 style={{ marginBottom: '0.75rem' }}>Your Cart is Empty</h2>
          <p style={{ marginBottom: '2rem' }}>Experience our curated collection and find your next essential.</p>
          <Link to="/shop" style={{ textDecoration: 'none' }}>
            <button className="btn-primary">Browse Collection</button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="main-content" style={{ marginTop: '1rem' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '2rem' }}
      >
        <Link to="/shop" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-tertiary)', textDecoration: 'none', marginBottom: '1rem', fontWeight: 600, fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Continue Shopping
        </Link>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>
          Your <span className="text-gradient">Cart</span>
        </h1>
        <p style={{ fontSize: '1rem' }}>{cartItems.length} items ready for checkout</p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2.5rem' }}>
        
        {/* Cart Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <AnimatePresence mode='popLayout'>
            {cartItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10, scale: 0.98 }}
                key={item.id}
                className="glass"
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '120px 1fr 140px', 
                  gap: '1.5rem', 
                  padding: '1.25rem', 
                  borderRadius: '1.5rem',
                  alignItems: 'center'
                }}
              >
                <div style={{ background: 'white', borderRadius: '1rem', padding: '8px', height: '120px', overflow: 'hidden' }}>
                  <img src={item.thumbnail} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {item.category}
                  </span>
                  <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{item.title}</h3>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>${item.price}</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem', 
                    background: 'rgba(255,255,255,0.03)', 
                    padding: '6px 12px', 
                    borderRadius: '0.75rem',
                    border: '1px solid var(--border-soft)'
                  }}>
                    <button 
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, (item.quantity || 1) - 1) }))}
                      style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', padding: '4px' }}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ fontWeight: 800, fontSize: '1rem', minWidth: '15px', textAlign: 'center' }}>{item.quantity || 1}</span>
                    <button 
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: (item.quantity || 1) + 1 }))}
                      style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', padding: '4px' }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button 
                    onClick={() => dispatch(removeFromCart(item.id))}
                    style={{ 
                      background: 'rgba(251, 113, 133, 0.1)', 
                      border: 'none', 
                      color: 'var(--accent-rose)', 
                      padding: '8px', 
                      borderRadius: '0.75rem', 
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex'
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <aside style={{ position: 'sticky', top: '90px', height: 'fit-content' }}>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass"
            style={{ padding: '2rem', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Order Summary</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 700, color: 'white' }}>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                <span>Shipping</span>
                <span style={{ fontWeight: 700, color: shipping === 0 ? 'var(--accent-emerald)' : 'white' }}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                <span>Est. Tax (8%)</span>
                <span style={{ fontWeight: 700, color: 'white' }}>${tax.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.4rem', fontWeight: 800, marginTop: '1rem' }}>
                <span>Total</span>
                <span className="text-gradient">${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="btn-primary" style={{ width: '100%', padding: '1rem' }}>
              Checkout Now
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                <ShieldCheck size={16} color="var(--accent-emerald)" />
                Secure Checkout
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                <Truck size={16} color="var(--primary)" />
                Reliable Global Shipping
              </div>
            </div>
          </motion.div>
        </aside>

      </div>
    </div>
  );
};

export default Cart;
