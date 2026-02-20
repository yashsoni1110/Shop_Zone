import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully!', {
      style: {
        background: 'rgba(30, 41, 59, 0.9)',
        color: '#fff',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)'
      }
    });
    e.target.reset();
  };

  return (
    <div className="main-content">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <h1>Get in Touch</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>We'd love to hear from you. Drop us a message below.</p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', maxWidth: '1000px', margin: '0 auto' }}>
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="glass" style={{ padding: '2rem', borderRadius: '1.5rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Contact Information</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '0.75rem', borderRadius: '50%', color: 'var(--primary)' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: '600' }}>Email Us</div>
                  <div style={{ color: 'var(--text-muted)' }}>support@shopzone.com</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '0.75rem', borderRadius: '50%', color: 'var(--primary)' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: '600' }}>Call Us</div>
                  <div style={{ color: 'var(--text-muted)' }}>+1 (555) 123-4567</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '0.75rem', borderRadius: '50%', color: 'var(--primary)' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: '600' }}>Visit Us</div>
                  <div style={{ color: 'var(--text-muted)' }}>123 Commerce St, Tech City</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass" style={{ padding: '2rem', borderRadius: '1.5rem', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Map Integration Placeholder</span>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <form onSubmit={handleSubmit} className="glass" style={{ padding: '2.5rem', borderRadius: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Send a Message</h2>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-muted)' }}>Name</label>
              <input 
                type="text" 
                placeholder="Your Name" 
                required
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  borderRadius: '0.75rem', 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  color: 'white',
                  outline: 'none',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-muted)' }}>Email</label>
              <input 
                type="email" 
                placeholder="your@email.com" 
                required
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  borderRadius: '0.75rem', 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  color: 'white',
                  outline: 'none',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-muted)' }}>Message</label>
              <textarea 
                placeholder="How can we help?" 
                rows="5"
                required
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  borderRadius: '0.75rem', 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  color: 'white',
                  outline: 'none',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              ></textarea>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="btn-primary"
              style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontSize: '1.125rem' }}
            >
              Send Message <Send size={20} />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
