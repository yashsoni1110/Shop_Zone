import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ShoppingCart, Star, X, LayoutGrid, Sparkles, Sofa, Apple, Gem, Smartphone, Watch, Camera, Footprints, Shirt, Glasses, Package } from 'lucide-react';
import { addToCart } from '../redux/cartSlice';
import { setCategory, setPriceRange, setSearchTerm } from '../redux/filterSlice';
import toast from 'react-hot-toast';

const Shop = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category, priceRange, searchTerm } = useSelector((state) => state.filters);

  const categoryMap = [
    { id: "all", label: "All Products", icon: <LayoutGrid size={18} /> },
    { id: "beauty", label: "Beauty", icon: <Sparkles size={18} /> },
    { id: "fragrances", label: "Fragrances", icon: <Sparkles size={18} /> },
    { id: "furniture", label: "Furniture", icon: <Sofa size={18} /> },
    { id: "groceries", label: "Groceries", icon: <Apple size={18} /> },
    { id: "home-decoration", label: "Home Decor", icon: <Gem size={18} /> },
    { id: "kitchen-accessories", label: "Kitchen", icon: <Gem size={18} /> },
    { id: "laptops", label: "Laptops", icon: <Smartphone size={18} /> },
    { id: "mens-shirts", label: "Men's Fashion", icon: <Shirt size={18} /> },
    { id: "mens-shoes", label: "Men's Shoes", icon: <Footprints size={18} /> },
    { id: "mens-watches", label: "Watches", icon: <Watch size={18} /> },
    { id: "mobile-accessories", label: "Accessories", icon: <Smartphone size={18} /> },
    { id: "motorcycle", label: "Motorcycle", icon: <Package size={18} /> },
    { id: "skin-care", label: "Skin Care", icon: <Sparkles size={18} /> },
    { id: "smartphones", label: "Smartphones", icon: <Smartphone size={18} /> },
    { id: "sports-accessories", label: "Sports", icon: <Package size={18} /> },
    { id: "sunglasses", label: "Sunglasses", icon: <Glasses size={18} /> },
    { id: "tablets", label: "Tablets", icon: <Smartphone size={18} /> },
    { id: "tops", label: "Tops", icon: <Shirt size={18} /> },
    { id: "vehicle", label: "Vehicle", icon: <Package size={18} /> },
    { id: "womens-bags", label: "Bags", icon: <Gem size={18} /> },
    { id: "womens-dresses", label: "Dresses", icon: <Shirt size={18} /> },
    { id: "womens-jewellery", label: "Jewellery", icon: <Gem size={18} /> },
    { id: "womens-shoes", label: "Women's Shoes", icon: <Footprints size={18} /> },
    { id: "womens-watches", label: "Women's Watches", icon: <Watch size={18} /> }
  ];

  useEffect(() => {
    setLoading(true);
    fetch('https://dummyjson.com/products?limit=100')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || product.category === category;
    const matchesPrice = product.price <= priceRange;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleAddToCart = (e, product) => {
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

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );

  return (
    <div className="main-content" style={{ marginTop: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem' }}>
        
        {/* Sidebar Filters - Sticky Overlay Fix */}
        <aside style={{ 
          position: 'sticky', 
          top: '95px', 
          height: 'calc(100vh - 120px)', 
          zIndex: 40 
        }}>
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass custom-scrollbar"
            style={{ 
              padding: '1.5rem', 
              borderRadius: '1.5rem', 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1.25rem',
              overflowY: 'auto',
              overflowX: 'hidden'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', paddingBottom: '0.25rem', flexShrink: 0 }}>
              <Filter size={18} color="var(--primary)" />
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Filter Products</h3>
            </div>

            {/* Category Filter - Integrated Scrolling */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h4 style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 800 }}>Categories</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                {categoryMap.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => dispatch(setCategory(cat.id))}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      textAlign: 'left',
                      padding: '0.6rem 0.8rem',
                      borderRadius: '0.8rem',
                      background: category === cat.id ? 'var(--primary-glow)' : 'transparent',
                      border: 'none',
                      color: category === cat.id ? 'white' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: category === cat.id ? 700 : 500,
                      transition: 'all 0.2s',
                      width: '100%'
                    }}
                  >
                    <span style={{ opacity: category === cat.id ? 1 : 0.5, display: 'flex', flexShrink: 0 }}>{cat.icon}</span>
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter - Solid at bottom if space permits, else scrolls */}
            <div style={{ marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid var(--border-soft)', flexShrink: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 800 }}>Max Price</span>
                <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1rem' }}>${priceRange}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="2000" 
                step="10"
                value={priceRange}
                onChange={(e) => dispatch(setPriceRange(parseInt(e.target.value)))}
                style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--primary)' }}
              />
            </div>

            {/* Clear All - Floating bottom */}
            {(category !== 'all' || priceRange < 2000 || searchTerm !== '') && (
              <button
                onClick={() => {
                  dispatch(setCategory('all'));
                  dispatch(setPriceRange(2000));
                  dispatch(setSearchTerm(''));
                }}
                className="btn-secondary"
                style={{ width: '100%', padding: '0.6rem', fontSize: '0.85rem', flexShrink: 0 }}
              >
                Reset All
              </button>
            )}
          </motion.div>
        </aside>

        {/* Product Grid Area */}
        <main>
          {/* Organized Header */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', flexWrap: 'wrap' }}>
              <div>
                <h1 style={{ marginBottom: '0.25rem', fontSize: '2.5rem' }}>
                  Explore <span className="text-gradient">Collections</span>
                </h1>
                <p style={{ fontSize: '1rem' }}>
                  Showing {filteredProducts.length} premium pieces
                </p>
              </div>

              <div className="glass" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '0.6rem 1.25rem', 
                borderRadius: '1.25rem',
                width: '100%',
                maxWidth: '380px',
                background: 'rgba(255,255,255,0.02)'
              }}>
                <Search size={18} color="var(--text-tertiary)" />
                <input 
                  type="text" 
                  placeholder="Search catalog..." 
                  value={searchTerm}
                  onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                  style={{ 
                    background: 'transparent', 
                    border: 'none', 
                    color: 'white', 
                    marginLeft: '0.75rem', 
                    flex: 1, 
                    outline: 'none',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Grid */}
          <AnimatePresence mode='popLayout'>
            <div className="product-grid">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.03, duration: 0.4 }}
                  className="glass clickable"
                  style={{ borderRadius: '1.5rem', overflow: 'hidden', height: '100%' }}
                >
                  <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ position: 'relative', paddingTop: '100%', background: 'rgba(255,255,255,0.01)' }}>
                      <motion.img 
                        whileHover={{ scale: 1.08 }}
                        src={product.thumbnail} 
                        alt={product.title} 
                        style={{ position: 'absolute', top: '10%', left: '10%', width: '80%', height: '80%', objectFit: 'contain' }} 
                      />
                      <div style={{ 
                        position: 'absolute', top: '1rem', right: '1rem', 
                        background: 'rgba(15, 23, 42, 0.8)', padding: '4px 10px', 
                        borderRadius: '0.75rem', fontSize: '0.8rem', fontWeight: 700,
                        display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid var(--accent-gold)'
                      }}>
                        <Star size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />
                        {product.rating}
                      </div>
                    </div>

                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {product.category}
                      </span>
                      <h3 style={{ fontSize: '1.1rem', lineHeight: '1.4', margin: 0, minHeight: '3rem' }}>{product.title}</h3>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                        <span style={{ fontSize: '1.4rem', fontWeight: 800 }}>${product.price}</span>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => handleAddToCart(e, product)}
                          style={{ 
                            background: 'var(--gradient-base)', border: 'none', 
                            width: '44px', height: '44px', borderRadius: '1rem', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', 
                            cursor: 'pointer', color: 'white',
                            boxShadow: '0 4px 12px var(--primary-glow)'
                          }}
                        >
                          <ShoppingCart size={20} />
                        </motion.button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
               <Search size={48} color="var(--text-dim)" style={{ marginBottom: '1rem' }} />
               <h2>No products match your criteria</h2>
               <p>Try adjusting your search or filters.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
