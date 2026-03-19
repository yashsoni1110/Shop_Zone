import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Contact from './pages/Contact';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Toaster position="bottom-right" />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/shop"       element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart"       element={<Cart />} />
            <Route path="/wishlist"   element={<Wishlist />} />
            <Route path="/contact"    element={<Contact />} />
            <Route path="/about-us"   element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
