import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (e, product) => {
    e.preventDefault();
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

  return (
    <div className="main-content">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '3rem', 
          flexWrap: 'wrap', 
          gap: '1rem' 
        }}
      >
        <div>
          <h1>Explore Collection</h1>
          <p style={{ color: 'var(--text-muted)' }}>Find your next favorite item.</p>
        </div>

        <div className="glass" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0.75rem 1.5rem', 
          borderRadius: '9999px',
          width: '100%',
          maxWidth: '400px'
        }}>
          <Search size={20} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'white', 
              marginLeft: '1rem', 
              flex: 1, 
              outline: 'none',
              fontSize: '1rem' 
            }}
          />
        </div>
      </motion.div>

      <motion.div 
        layout 
        className="product-grid"
      >
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -10 }}
              key={product.id}
              className="glass"
              style={{
                borderRadius: '1rem',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', paddingTop: '100%', overflow: 'hidden' }}>
                  <img 
                    src={product.thumbnail} 
                    alt={product.title} 
                    style={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'contain',
                      transition: 'transform 0.5s ease'
                    }} 
                    className="product-img"
                  />
                  <div style={{ 
                    position: 'absolute', 
                    top: '10px', 
                    right: '10px', 
                    // background: 'rgba(255, 255, 255, 0.9)', 
                    color: 'white', 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontWeight: 'bold', 
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Star size={12} fill="#f59e0b" color="#f59e0b" />
                    {product.rating}
                  </div>
                </div>

                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ textTransform: 'uppercase', fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '600', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                    {product.category}
                  </div>
                  <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', lineHeight: '1.4', flex: 1 }}>{product.title}</h3>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${product.price}</span>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => handleAddToCart(e, product)}
                      style={{ 
                        background: 'var(--gradient-main)', 
                        border: 'none', 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        cursor: 'pointer',
                        color: 'white',
                        boxShadow: '0 4px 10px rgba(99, 102, 241, 0.4)'
                      }}
                    >
                      <ShoppingCart size={20} />
                    </motion.button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Shop;
