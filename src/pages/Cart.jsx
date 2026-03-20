import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2, Plus, Minus, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((s) => s.cart.items);

  const subtotal = cartItems.reduce((a, i) => a + i.price * (i.quantity || 1), 0);
  const shipping  = subtotal > 0 && subtotal < 50 ? 9.99 : 0;
  const tax       = subtotal * 0.08;
  const total     = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="loading-container" style={{ flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ width: 64, height: 64, background: 'var(--bg-muted)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ShoppingBag size={30} strokeWidth={1.5} color="var(--text-subtle)" />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.375rem' }}>Your bag is empty</h2>
          <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>Add items from the shop to see them here.</p>
          <Link to="/shop"><button className="btn-primary">Browse Shop <ArrowRight size={15} /></button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content" style={{ padding: '2.5rem 2rem 5rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '2rem' }}>
        Shopping Bag
        <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
          ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
        </span>
      </h1>

      <div className="cart-main-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '3rem', alignItems: 'start' }}>

        {/* ── Items ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          <AnimatePresence>
            {cartItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr auto',
                  gap: '1.5rem',
                  padding: '1.5rem 0',
                  borderBottom: '1px solid var(--border-base)',
                  alignItems: 'start',
                }}
              >
                {/* Thumbnail */}
                <div style={{ background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: 100 }}>
                  <img src={item.thumbnail} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>

                {/* Details */}
                <div>
                  <p style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-subtle)', margin: '0 0 0.25rem' }}>
                    {item.brand || item.category}
                  </p>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.5rem' }}>{item.title}</h3>
                  <span style={{ fontSize: '1.0625rem', fontWeight: 900 }}>${item.price}</span>

                  {/* Qty controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.875rem', width: 'fit-content' }}>
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, (item.quantity||1) - 1) }))}
                      style={{ width: 28, height: 28, border: '1px solid var(--border-base)', borderRadius: 'var(--radius-sm)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}
                    >
                      <Minus size={12} />
                    </button>
                    <span style={{ fontSize: '0.875rem', fontWeight: 800, minWidth: 20, textAlign: 'center' }}>{item.quantity || 1}</span>
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: (item.quantity||1) + 1 }))}
                      style={{ width: 28, height: 28, border: '1px solid var(--border-base)', borderRadius: 'var(--radius-sm)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                {/* Remove + line total */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 900 }}>${(item.price * (item.quantity||1)).toFixed(2)}</span>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-subtle)', padding: '0.25rem', borderRadius: 'var(--radius-sm)', transition: 'color var(--duration)' }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--accent-red)'}
                    onMouseOut={e => e.currentTarget.style.color = 'var(--text-subtle)'}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ── Order Summary ── */}
        <aside style={{ position: 'sticky', top: '96px' }}>
          <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-base)', borderRadius: 'var(--radius-lg)', padding: '1.75rem' }}>
            <h2 style={{ fontSize: '0.875rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.5rem' }}>Order Summary</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '1.5rem' }}>
              {[
                { label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
                { label: 'Shipping', value: shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`, green: shipping === 0 },
                { label: 'Est. Tax (8%)', value: `$${tax.toFixed(2)}` },
              ].map(({ label, value, green }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                  <span style={{ fontWeight: 700, color: green ? 'var(--accent-green)' : 'var(--text-main)' }}>{value}</span>
                </div>
              ))}
            </div>

            <div className="divider" style={{ margin: '0 0 1.25rem' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: '1.125rem', marginBottom: '1.5rem' }}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.875rem', fontSize: '0.9375rem' }}>
              Checkout
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1.25rem' }}>
              {[
                { Icon: ShieldCheck, text: 'Secure, encrypted payment' },
                { Icon: Truck, text: 'Free shipping on orders $50+' },
              ].map(({ Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                  <Icon size={14} /> {text}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
