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
- Use React Context API for global cart state management
```

---

## 🎨 UI & Design

```
Apply a premium dark theme to the entire app with the following design language:
- Deep slate/navy dark background (#0f172a, #1e293b)
- Indigo-to-purple gradient accents
- Glassmorphism cards (backdrop-filter: blur, translucent borders)
- CSS variables for consistent theming across all components
- Google Fonts: "Inter" for body text
- Smooth hover transitions and micro-animations on all interactive elements
```

```
Create an animated Hero section for the home page with:
- A large heading with a gradient text span
- A subtitle paragraph
- Two CTA buttons: "Explore Collection" and "Our Story"
- Two abstract radial gradient blobs in the background that slowly pulse
- Framer Motion fade-in and slide-up animations on mount
```

```
Style the Navbar component with:
- A glassmorphism background (frosted glass effect) that locks to the top
- Brand logo/name on the left
- Navigation links (Home, Shop, About, Contact) in the center/right
- A cart icon with a live item count badge
- Smooth underline hover effect on nav links
```

---

## 🛒 Features

```
Build a CartContext using React's Context API and useReducer.
It should support the following actions:
- ADD_TO_CART: Add a product, or increase quantity if it already exists
- REMOVE_FROM_CART: Remove a product entirely from the cart
- UPDATE_QUANTITY: Increase or decrease the quantity of a specific item
- CLEAR_CART: Empty the entire cart
Persist the cart to localStorage so it survives page refreshes.
```

```
Create a reusable ProductCard component that displays:
- Product thumbnail image
- Product title (truncated to 2 lines)
- Star rating display
- Price formatted with a dollar sign
- An "Add to Cart" button that triggers a react-hot-toast notification on click
- A hover effect that lifts the card slightly with a glowing box-shadow
```

```
Build the Shop page with:
- A search bar to filter products by name
- Category filter buttons (All, Smartphones, Laptops, Fragrances, etc.)
- Products fetched from DummyJSON API filtered on category change
- A responsive product grid (auto-fit minmax 280px)
- A loading skeleton or spinner while data is fetching
```

---

## 📄 Pages

```
Create an About Us page for Shop Zone with:
- A hero section explaining the brand mission
- A "Why Choose Us" section with 3-4 feature cards (Quality, Speed, Support, Security)
- A team or brand values section
- Framer Motion scroll-triggered animations on all sections
- Premium glassmorphism card styling consistent with the rest of the app
```

```
Build a Contact page with:
- A styled contact form (Name, Email, Subject, Message fields)
- Form validation and a submit handler that shows a success toast
- Store contact info on the side (address, phone, email, hours)
- Icons from lucide-react for each info item
```

```
Create a Product Details page that:
- Fetches the single product from /products/:id
- Displays the full product image, title, description, price, and rating
- Has an "Add to Cart" button with a quantity selector
- Shows related products or a "Back to Shop" link
- Uses Framer Motion for page entry animation
```

---

## 🔧 Enhancement Prompts

```
Add a comprehensive global footer to the app with:
- Brand logo and tagline on the left
- Navigation columns (Shop, Company, Support) with links
- Social media icon links
- A newsletter email signup input
- Copyright notice at the bottom
- Consistent dark glassmorphism styling
```

```
Add a "New Arrivals" and "Best Sellers" section on the Home page.
Fetch products from different DummyJSON endpoints or different skip values.
Display them in a horizontal scrolling row or a 4-column grid.
Add a "View All" link that goes to the /shop page.
```

```
Polish all animations across the site using Framer Motion:
- Use variants with staggerChildren for grid sections
- Use whileInView with once: true for scroll-triggered reveals
- Add whileHover={{ y: -5 }} to all cards
- Add whileTap={{ scale: 0.95 }} to all buttons
- Keep transition durations between 0.4s and 0.8s for a premium feel
```

---

> 💡 **Tip:** When asking AI to make changes, always specify the file name, the component name, and the exact behavior you want. The more specific you are, the better the result.
