import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ChevronRight, ChevronDown, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  toggleCategory, toggleBrand,
  setMinPrice, setMaxPrice,
  setSearchTerm, clearFilters,
} from '../redux/filterSlice';
import ProductCard from '../components/ProductCard';

const MAX = 2000;
const MIN = 0;

const CATEGORIES = [
  { id: 'beauty',              label: 'Beauty' },
  { id: 'fragrances',         label: 'Fragrances' },
  { id: 'furniture',          label: 'Furniture' },
  { id: 'groceries',          label: 'Groceries' },
  { id: 'home-decoration',    label: 'Home Decor' },
  { id: 'kitchen-accessories',label: 'Kitchen' },
  { id: 'laptops',            label: 'Laptops' },
  { id: 'mens-shirts',        label: "Men's Fashion" },
  { id: 'mens-shoes',         label: "Men's Shoes" },
  { id: 'mens-watches',       label: 'Watches' },
  { id: 'mobile-accessories', label: 'Accessories' },
  { id: 'skin-care',          label: 'Skin Care' },
  { id: 'smartphones',        label: 'Smartphones' },
  { id: 'sports-accessories', label: 'Sports' },
  { id: 'sunglasses',         label: 'Sunglasses' },
  { id: 'tablets',            label: 'Tablets' },
  { id: 'tops',               label: 'Tops' },
  { id: 'womens-bags',        label: 'Bags' },
  { id: 'womens-dresses',     label: 'Dresses' },
  { id: 'womens-jewellery',   label: 'Jewellery' },
  { id: 'womens-shoes',       label: "Women's Shoes" },
  { id: 'womens-watches',     label: "Women's Watches" },
];

export default function Shop() {
  const dispatch = useDispatch();
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [sidebarOpen, setSidebar] = useState(false);
  const [sortBy, setSortBy]       = useState('default');

  const { categories, brands, minPrice, maxPrice, searchTerm } =
    useSelector(s => s.filters);

  // Local input state for typed fields (uncontrolled-feel)
  const [localMin, setLocalMin] = useState(String(minPrice));
  const [localMax, setLocalMax] = useState(String(maxPrice));

  // Keep local inputs in sync when Redux resets (clearFilters)
  useEffect(() => { setLocalMin(String(minPrice)); }, [minPrice]);
  useEffect(() => { setLocalMax(String(maxPrice)); }, [maxPrice]);

  const availableBrands = useMemo(
    () => [...new Set(products.map(p => p.brand).filter(Boolean))].slice(0, 15),
    [products]
  );

  useEffect(() => {
    setLoading(true);
    fetch('https://dummyjson.com/products?limit=100')
      .then(r => r.json())
      .then(d => { setProducts(d.products); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      if (searchTerm && !p.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (categories.length && !categories.includes(p.category)) return false;
      if (brands.length    && !brands.includes(p.brand))         return false;
      if (p.price < minPrice || p.price > maxPrice)              return false;
      return true;
    });
    if (sortBy === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === 'rating')     list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, searchTerm, categories, brands, minPrice, maxPrice, sortBy]);

  const hasFilters = categories.length || brands.length || minPrice > 0 || maxPrice < MAX || searchTerm;

  // Slider thumb %
  const minPct = ((minPrice - MIN) / (MAX - MIN)) * 100;
  const maxPct = ((maxPrice - MIN) / (MAX - MIN)) * 100;

  const handleMinSlider = (val) => {
    const v = Math.min(Number(val), maxPrice - 10);
    dispatch(setMinPrice(v));
  };
  const handleMaxSlider = (val) => {
    const v = Math.max(Number(val), minPrice + 10);
    dispatch(setMaxPrice(v));
  };

  const commitMin = () => {
    let v = Number(localMin);
    if (isNaN(v) || v < MIN) v = MIN;
    if (v >= maxPrice) v = maxPrice - 10;
    dispatch(setMinPrice(v));
    setLocalMin(String(v));
  };
  const commitMax = () => {
    let v = Number(localMax);
    if (isNaN(v) || v > MAX) v = MAX;
    if (v <= minPrice) v = minPrice + 10;
    dispatch(setMaxPrice(v));
    setLocalMax(String(v));
  };

  if (loading) return (
    <div className="loading-container"><div className="loading-spinner" /></div>
  );

  return (
    <div className="main-content" style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>

      {/* ── Breadcrumb ── */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: 'var(--text-subtle)', marginBottom: '1.5rem' }}>
        <Link to="/" style={{ color: 'inherit', fontWeight: 600 }}>Home</Link>
        <ChevronRight size={12} />
        <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>Shop</span>
      </nav>

      {/* ── Toolbar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '1rem', flexWrap: 'wrap',
        paddingBottom: '1.25rem', marginBottom: '2rem',
        borderBottom: '1px solid var(--border-base)',
      }}>
        <div className="desktop-only" style={{ display: 'flex' }}>
          <h1 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 400, fontSize: '1.75rem', margin: 0, letterSpacing: '-0.01em' }}>
            All Products
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, color: 'var(--text-subtle)', fontSize: '0.875rem', marginLeft: '0.625rem' }}>
              {filtered.length} items
            </span>
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={14} style={{ position: 'absolute', left: '0.75rem', color: 'var(--text-subtle)', pointerEvents: 'none' }} />
            <input
              className="input-base"
              style={{ paddingLeft: '2.25rem', paddingTop: '0.5625rem', paddingBottom: '0.5625rem', width: 210, fontSize: '0.8125rem' }}
              placeholder="Search products…"
              value={searchTerm}
              onChange={e => dispatch(setSearchTerm(e.target.value))}
            />
          </div>

          {/* Sort */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{
                appearance: 'none', border: '1px solid var(--border-base)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.5625rem 2.25rem 0.5625rem 0.875rem',
                fontSize: '0.8125rem', color: 'var(--text-muted)',
                background: 'var(--bg-main)', cursor: 'pointer', outline: 'none',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <ChevronDown size={12} style={{ position: 'absolute', right: '0.625rem', color: 'var(--text-subtle)', pointerEvents: 'none' }} />
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setSidebar(o => !o)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              border: '1px solid var(--border-base)',
              borderRadius: 'var(--radius-sm)',
              background: sidebarOpen ? 'var(--text-main)' : 'transparent',
              color: sidebarOpen ? 'white' : 'var(--text-muted)',
              padding: '0.5625rem 0.875rem',
              fontSize: '0.8125rem', fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.04em',
              transition: 'all var(--duration) var(--ease)',
            }}
          >
            <SlidersHorizontal size={14} strokeWidth={1.75} />
            Filters
            {hasFilters && (
              <span style={{
                background: sidebarOpen ? 'white' : 'var(--text-main)',
                color: sidebarOpen ? 'var(--text-main)' : 'white',
                borderRadius: '99px', minWidth: 18, height: 18,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.6rem', fontWeight: 800,
              }}>
                {categories.length + brands.length + (minPrice > 0 || maxPrice < MAX ? 1 : 0) + (searchTerm ? 1 : 0)}
              </span>
            )}
          </button>

          {hasFilters && (
            <button onClick={() => dispatch(clearFilters())} className="btn-ghost" style={{ color: 'var(--accent-red)', fontSize: '0.8125rem' }}>
              <X size={13} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Active filter chips ── */}
      {(categories.length > 0 || brands.length > 0 || minPrice > 0 || maxPrice < MAX) && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1.5rem' }}>
          {searchTerm && (
            <Chip label={`"${searchTerm}"`} onRemove={() => dispatch(setSearchTerm(''))} />
          )}
          {(minPrice > 0 || maxPrice < MAX) && (
            <Chip label={`$${minPrice} – $${maxPrice}`} onRemove={() => { dispatch(setMinPrice(0)); dispatch(setMaxPrice(MAX)); }} />
          )}
          {categories.map(c => (
            <Chip key={c} label={CATEGORIES.find(x => x.id === c)?.label || c} onRemove={() => dispatch(toggleCategory(c))} />
          ))}
          {brands.map(b => (
            <Chip key={b} label={b} onRemove={() => dispatch(toggleBrand(b))} />
          ))}
        </div>
      )}

      {/* ── Main layout ── */}
      <div className="shop-main-layout" style={{ display: 'grid', gridTemplateColumns: sidebarOpen ? '240px 1fr' : '1fr', gap: '3rem', alignItems: 'start' }}>

        {/* ── Sidebar ── */}
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.22 }}
              className="hide-scrollbar shop-sidebar-panel"
              style={{ position: 'sticky', top: '88px', height: 'calc(100vh - 112px)', overflowY: 'auto' }}
            >

              {/* ── PRICE RANGE ── */}
              <SidebarSection title="Price Range">
                {/* Typed inputs */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: '0.375rem' }}>Min ($)</label>
                    <input
                      type="number"
                      min={MIN} max={MAX}
                      value={localMin}
                      onChange={e => setLocalMin(e.target.value)}
                      onBlur={commitMin}
                      onKeyDown={e => e.key === 'Enter' && commitMin()}
                      style={{
                        width: '100%', padding: '0.5rem 0.625rem',
                        border: '1px solid var(--border-base)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.875rem', fontWeight: 600,
                        color: 'var(--text-main)', background: 'var(--bg-main)',
                        outline: 'none', transition: 'border-color var(--duration)',
                        fontFamily: 'Inter, sans-serif',
                      }}
                      onFocus={e => e.target.style.borderColor = 'var(--text-main)'}
                      onBlurCapture={e => e.target.style.borderColor = 'var(--border-base)'}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: '0.375rem' }}>Max ($)</label>
                    <input
                      type="number"
                      min={MIN} max={MAX}
                      value={localMax}
                      onChange={e => setLocalMax(e.target.value)}
                      onBlur={commitMax}
                      onKeyDown={e => e.key === 'Enter' && commitMax()}
                      style={{
                        width: '100%', padding: '0.5rem 0.625rem',
                        border: '1px solid var(--border-base)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.875rem', fontWeight: 600,
                        color: 'var(--text-main)', background: 'var(--bg-main)',
                        outline: 'none', transition: 'border-color var(--duration)',
                        fontFamily: 'Inter, sans-serif',
                      }}
                      onFocus={e => e.target.style.borderColor = 'var(--text-main)'}
                      onBlurCapture={e => e.target.style.borderColor = 'var(--border-base)'}
                    />
                  </div>
                </div>

                {/* Dual-range slider track */}
                <div style={{ position: 'relative', height: 28, marginBottom: '0.375rem' }}>
                  {/* Track base */}
                  <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 3, background: 'var(--border-base)', borderRadius: 99, transform: 'translateY(-50%)' }} />
                  {/* Active range fill */}
                  <div style={{
                    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
                    height: 3, borderRadius: 99, background: 'var(--text-main)',
                    left: `${minPct}%`, right: `${100 - maxPct}%`,
                  }} />
                  {/* Min thumb */}
                  <input
                    type="range" min={MIN} max={MAX} step={10}
                    value={minPrice}
                    onChange={e => handleMinSlider(e.target.value)}
                    style={{
                      position: 'absolute', width: '100%', height: '100%',
                      top: 0, left: 0, margin: 0,
                      appearance: 'none', background: 'transparent', cursor: 'pointer',
                      pointerEvents: 'auto', zIndex: 3,
                    }}
                  />
                  {/* Max thumb */}
                  <input
                    type="range" min={MIN} max={MAX} step={10}
                    value={maxPrice}
                    onChange={e => handleMaxSlider(e.target.value)}
                    style={{
                      position: 'absolute', width: '100%', height: '100%',
                      top: 0, left: 0, margin: 0,
                      appearance: 'none', background: 'transparent', cursor: 'pointer',
                      pointerEvents: 'auto', zIndex: 4,
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>${MIN}</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>${minPrice} – ${maxPrice}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>${MAX}</span>
                </div>

                {/* Preset chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: '0.875rem' }}>
                  {[
                    { label: 'Under $50',  min: 0, max: 50 },
                    { label: '$50–$200',   min: 50, max: 200 },
                    { label: '$200–$500',  min: 200, max: 500 },
                    { label: 'Over $500',  min: 500, max: 2000 },
                  ].map(pre => {
                    const active = minPrice === pre.min && maxPrice === pre.max;
                    return (
                      <button
                        key={pre.label}
                        onClick={() => { dispatch(setMinPrice(pre.min)); dispatch(setMaxPrice(pre.max)); }}
                        style={{
                          padding: '0.2rem 0.625rem',
                          border: `1px solid ${active ? 'var(--text-main)' : 'var(--border-base)'}`,
                          borderRadius: '99px',
                          background: active ? 'var(--text-main)' : 'transparent',
                          color: active ? 'white' : 'var(--text-muted)',
                          fontSize: '0.7rem', fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all var(--duration) var(--ease)',
                        }}
                      >
                        {pre.label}
                      </button>
                    );
                  })}
                </div>
              </SidebarSection>

              {/* ── CATEGORIES ── */}
              <SidebarSection title="Categories">
                {CATEGORIES.map(cat => (
                  <label key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer', padding: '0.35rem 0', borderBottom: '1px solid var(--border-light)' }}>
                    <input
                      type="checkbox"
                      checked={categories.includes(cat.id)}
                      onChange={() => dispatch(toggleCategory(cat.id))}
                      style={{ width: 14, height: 14, accentColor: 'var(--brand)', cursor: 'pointer', flexShrink: 0 }}
                    />
                    <span style={{
                      fontSize: '0.8125rem',
                      color: categories.includes(cat.id) ? 'var(--text-main)' : 'var(--text-muted)',
                      fontWeight: categories.includes(cat.id) ? 600 : 400,
                      transition: 'color var(--duration)',
                    }}>
                      {cat.label}
                    </span>
                  </label>
                ))}
              </SidebarSection>

              {/* ── BRAND ── */}
              <SidebarSection title="Brand">
                {availableBrands.map(b => (
                  <label key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer', padding: '0.35rem 0', borderBottom: '1px solid var(--border-light)' }}>
                    <input
                      type="checkbox"
                      checked={brands.includes(b)}
                      onChange={() => dispatch(toggleBrand(b))}
                      style={{ width: 14, height: 14, accentColor: 'var(--brand)', cursor: 'pointer', flexShrink: 0 }}
                    />
                    <span style={{
                      fontSize: '0.8125rem',
                      color: brands.includes(b) ? 'var(--text-main)' : 'var(--text-muted)',
                      fontWeight: brands.includes(b) ? 600 : 400,
                      transition: 'color var(--duration)',
                    }}>
                      {b}
                    </span>
                  </label>
                ))}
              </SidebarSection>

            </motion.aside>
          )}
        </AnimatePresence>

        {/* ── Product Grid ── */}
        <main>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '8rem 2rem' }}>
              <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2.25rem', fontWeight: 400, marginBottom: '0.75rem' }}>Nothing found</p>
              <p style={{ fontSize: '0.875rem', marginBottom: '2rem' }}>Try adjusting filters or your price range.</p>
              <button onClick={() => dispatch(clearFilters())} className="btn-secondary">Clear All Filters</button>
            </div>
          ) : (
            <div className="shop-product-grid" style={{
              display: 'grid',
              gridTemplateColumns: sidebarOpen ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '1.25rem', rowGap: '3rem',
            }}>
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </main>
      </div>

      {/* Range input thumb styles */}
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px; height: 18px;
          border-radius: 50%;
          background: white;
          border: 2px solid #1c1c1e;
          box-shadow: 0 1px 4px rgba(28,28,30,0.2);
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        input[type=range]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        input[type=range]::-moz-range-thumb {
          width: 18px; height: 18px;
          border-radius: 50%;
          background: white;
          border: 2px solid #1c1c1e;
          cursor: pointer;
        }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none; margin: 0;
        }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>
    </div>
  );
}

/* ── Sub-components ── */

function Chip({ label, onRemove }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
      background: 'var(--bg-muted)', border: '1px solid var(--border-base)',
      borderRadius: '99px', padding: '0.2rem 0.625rem 0.2rem 0.75rem',
      fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-main)',
    }}>
      {label}
      <button
        onClick={onRemove}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-subtle)', display: 'flex', padding: 0, lineHeight: 1 }}
        onMouseOver={e => e.currentTarget.style.color = 'var(--text-main)'}
        onMouseOut ={e => e.currentTarget.style.color = 'var(--text-subtle)'}
      >
        <X size={11} strokeWidth={2.5} />
      </button>
    </span>
  );
}

function SidebarSection({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'none', border: 'none', cursor: 'pointer',
          padding: '0.875rem 0',
          borderBottom: open ? 'none' : '1px solid var(--border-base)',
        }}
      >
        <span style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          {title}
        </span>
        <ChevronDown
          size={13} strokeWidth={2} color="var(--text-subtle)"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingBottom: '1.375rem', borderBottom: '1px solid var(--border-base)' }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
