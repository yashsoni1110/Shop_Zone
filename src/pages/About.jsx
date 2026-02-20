import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="main-content">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <h1>About ShopZone</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto' }}>
          We are redefining the online shopping experience.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="glass" style={{ padding: '2rem', borderRadius: '1.5rem', height: '400px', display: 'flex', alignItems: 'center', justifyItems: 'center', background: 'rgba(255,255,255,0.05)' }}>
             <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80" alt="Our Team" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem', opacity: 0.8 }} />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Our Story</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
            Founded in 2026, ShopZone started with a simple mission: to make premium products accessible to everyone. We believe that shopping should be more than just a transaction; it should be an experience.
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
            Our team works tirelessly to curate a selection of goods that meet our high standards for quality, sustainability, and design. Whether you're looking for the latest tech gadget or a timeless piece of furniture, ShopZone has something for you.
          </p>
          
          <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>50k+</div>
              <div style={{ color: 'var(--text-muted)' }}>Happy Customers</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>100%</div>
              <div style={{ color: 'var(--text-muted)' }}>Satisfaction</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>24/7</div>
              <div style={{ color: 'var(--text-muted)' }}>Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
