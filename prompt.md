# 🤖 Shop Zone — AI Prompts

A collection of prompts used to build and enhance this project with AI assistance.

---

## 🏗️ Project Setup

```
Create a modern e-commerce web application called "Shop Zone" using React + Vite.
The app should have:
- A home page with hero section, product categories, and featured products
- A shop page where users can browse and filter products
- A product details page
- A shopping cart with add/remove/quantity controls
- An about us page and contact page
- React Router for navigation
- Use the DummyJSON API (https://dummyjson.com/products) for product data
- Use Redux Toolkit for global cart and wishlist state management
```

---

## 🎨 UI & Design

```
Apply a premium editorial black & white theme to the entire app inspired by KLUR, The Row, Celine, Jil Sander:
- Warm white / ivory backgrounds (#ffffff, #faf9f7)
- Soft charcoal text (#1c1c1e)
- CSS variables for consistent theming
- Google Fonts: "Cormorant Garamond" for headings (serif), "Inter" for body
- Glassmorphism navbar (backdrop-filter blur + semi-transparent)
- Smooth hover transitions and micro-animations on all interactive elements
```

```
Create an animated Hero section for the home page with:
- A full-bleed editorial black & white background image
- A large serif heading with letter-spacing
- Two CTA buttons: "Explore Collection" and "Our Story"
- Framer Motion fade-in and slide-up animations on mount
```

```
Style the Navbar component with:
- A glassmorphism background (frosted glass effect) that sticks to the top
- SVG monogram logo + "SHOPZONE" wordmark on the left
- Navigation links (Shop, About, Contact) in the center — hidden on mobile
- Search, Wishlist (heart), and Cart (bag button desktop / icon mobile) on the right
- Hamburger menu icon on the extreme right for mobile only
- Smooth underline hover effect on nav links
```

---

## 🛒 Features

```
Build a Redux Toolkit store with:
- cartSlice: ADD_TO_CART (with quantity increment), REMOVE_FROM_CART, UPDATE_QUANTITY, CLEAR_CART
- wishlistSlice: toggle item in/out of wishlist
- filterSlice: categories, brands, price range, search term filters
Persist cart and wishlist to localStorage via redux-persist or manual hydration.
```

```
Create a reusable ProductCard component that displays:
- Product thumbnail image with a 133% aspect-ratio box
- Discount badge (top-left) when discount >= 10%
- Wishlist (heart) button (top-right, always visible)
- Cart icon button (top-right, mobile only — shown next to heart)
- "Add to Bag" hover overlay button (desktop only — slides up on hover)
- Brand/category label, product title (truncated), price + struck-out original price
- Framer Motion scale on hover
```

```
Build the Shop page with:
- A search bar + sort dropdown + Filters toggle button in the toolbar
- "All Products" heading hidden on mobile
- Filter sidebar (category, brand, price range checkboxes) - default OFF/closed
- Sidebar is sticky on desktop (position: sticky), non-sticky on mobile
- Products fetched from DummyJSON API with client-side filtering
- Active filter chips displayed below the toolbar
- 2-column product grid on mobile, auto-fill on desktop
- Loading spinner while data is fetching
```

```
Add a Wishlist page that:
- Shows all wishlisted products in a responsive grid
- Allows removing items from wishlist
- Shows an empty state with a link back to Shop
```

---

## 📄 Pages

```
Create an About Us page with:
- A hero section explaining the brand mission
- Stats grid (4-col desktop, 2-col mobile): Products, Brands, Customers, Countries
- "Why we started ShopZone" section with image + text (2-col desktop, 1-col mobile)
- Meet the Team section (3-col desktop, 2-col mobile)
- Framer Motion scroll-triggered animations on all sections
```

```
Build a Contact page with:
- Left column: contact info (address, phone, email, hours) with lucide-react icons
- Right column: styled contact form (First Name / Last Name grid → 1-col mobile,
  Email, Subject, Message fields)
- Form validation and a submit handler that shows a success toast
- Layout: 2-col desktop, 1-col mobile
```

```
Create a Product Details page that:
- Fetches the single product from /products/:id
- Displays product image (left) + info (right) in a 2-col grid (1-col on mobile)
- Shows title, brand, rating, price, discount, description
- Has "Add to Bag" and "Save to Wishlist" buttons
- Shows a reviews section below
- Uses Framer Motion for page entry animation
```

```
Build a Cart page with:
- Cart items list (left) + Order Summary sidebar (right) — 2-col desktop, 1-col mobile
- Each item: thumbnail, title, price, quantity stepper, remove button
- Summary: subtotal, savings, estimated shipping, total
- "Proceed to Checkout" button
```

---

## 📱 Responsive Design

```
Make the entire app fully responsive for mobile devices:
- Breakpoints: 900px (tablet), 768px (mobile), 480px (small phone)
- Use named CSS classes (.shop-main-layout, .product-details-layout, .cart-main-layout,
  .contact-main-layout, .footer-main-grid, .about-stats-layout, etc.) on grid containers
- Override inline styles via !important inside media queries
- product-grid and shop-product-grid: 2 columns on mobile (1fr 1fr)
- .desktop-only { display: flex } → display: none on mobile
- .mobile-only { display: none } → display: flex on mobile
- .nav-desktop-links hidden on mobile; .nav-hamburger shown on mobile
- Sidebar becomes non-sticky on mobile
- Footer stacks to 1 column on mobile
- Padding reduced: 1.25rem at 900px, 0.875rem at 768px
```

---

## 🔧 Enhancement Prompts

```
Add a comprehensive global footer with:
- Dark background (#1c1c1e)
- Brand logo + tagline on the left
- Navigation columns (Shop, Company, Support) with links
- Social media icon links
- Newsletter email signup
- Copyright notice at the bottom
- footer-main-grid class: 1.75fr repeat(3,1fr) desktop → 1col mobile
```

```
Implement a working mobile hamburger menu in the Navbar:
- Slides in from the right as a full-screen overlay
- Shows Shop, About, Contact as large serif links
- Close (X) button in the top-right
- Framer Motion slide-in animation (x: 100% → 0)
- Auto-closes on route change (useEffect on pathname)
- Extra links: Wishlist (count) and Cart (count) in the menu
```

```
Add a ScrollToTop component that:
- Uses useLocation() from react-router-dom
- On every pathname change, calls window.scrollTo({ top: 0, behavior: 'instant' })
- Is placed inside <Router> in App.jsx, above <Navbar>
- Ensures every page always opens from the very top
```

```
Polish all grid layouts across the site using CSS classes instead of inline styles:
- .shop-main-layout → 240px 1fr (sidebar + products), 1fr on mobile
- .shop-product-grid → auto-fill minmax desktop, 1fr 1fr on mobile
- .product-details-layout → 1fr 1fr, 1fr on mobile
- .cart-main-layout → 1fr 360px, 1fr on mobile
- .contact-main-layout → 1fr 1.5fr, 1fr on mobile
- .contact-names-grid → 1fr 1fr, 1fr on mobile
- .features-bar → repeat(4,1fr), 2-col mobile, 1-col at 480px
- .categories-layout → 1fr 1fr 1fr, 1fr on mobile
- .about-stats-layout → repeat(4,1fr), 2-col mobile
- .about-story-layout → 1fr 1fr, 1fr on mobile
- .about-team-layout → repeat(3,1fr), 2-col mobile
- .footer-main-grid → 1.75fr repeat(3,1fr), 1fr on mobile
```

---

> 💡 **Tip:** When asking AI to make changes, always specify the file name, the component name, and the exact behavior you want. Be specific about mobile vs desktop behavior, class names you want used, and which breakpoints matter. The more specific you are, the better the result.
