# 🛍️ Shop Zone — Premium E-Commerce Platform (Main Branch)

A modern, full-featured e-commerce web application built with **React + Vite**, featuring a premium editorial aesthetic, smooth animations, and advanced global state management.

🔗 **Live Demo (New Version):** [https://shop-39qis5191-yashsoni1110s-projects.vercel.app](https://shop-39qis5191-yashsoni1110s-projects.vercel.app)
*(Want to see the older version before the redesign? [Click here](https://shop-bkr62eino-yashsoni1110s-projects.vercel.app))*

---

## 📸 Overview

This branch (`main`) contains the newly upgraded application showcasing advanced **Redux Toolkit** state management and a highly stylized, minimalistic "editorial" black-and-white UI reminiscent of luxury fashion brands.

---

## ✨ Features

- 🏠 **Home Page** — Immersive dark hero section, curated categories, and dynamic glassmorphism navigation.
- 🛒 **Advanced Shop Page** — Browse all products with a complex filtering sidebar (Price Sliders, Categories, Brands, and Search) perfectly synced with Redux.
- 📄 **Product Details** — Full product view with image, rating, description, and add-to-cart functionality.
- 🎁 **Shopping Cart & Wishlist** — Persistent global cart and wishlist powered by dedicated Redux slices with real-time toast notifications.
- 🎨 **Editorial Premium UI** — Dynamic navigation that shifts from a dark blur on the Home page to a light glass effect elsewhere, utilizing structured typography (Cormorant Garamond & Inter).
- ⚙️ **Advanced State Management** — Prop-drilling eliminated! Uses `@reduxjs/toolkit` and `react-redux` for perfectly synchronized global state across all components.

---

## 🛠️ Tech Stack

| Technology                                     | Purpose                  |
| ---------------------------------------------- | ------------------------ |
| [React 19](https://react.dev)                  | UI Library               |
| [Redux Toolkit](https://redux-toolkit.js.org/) | Global State Management  |
| [Vite 7](https://vite.dev)                     | Build Tool & Dev Server  |
| [React Router DOM v7](https://reactrouter.com) | Client-side Routing      |
| [Framer Motion](https://www.framer.com/motion) | Animations & Transitions |
| [Lucide React](https://lucide.dev)             | Icon Library             |
| [React Hot Toast](https://react-hot-toast.com) | Toast Notifications      |
| [DummyJSON API](https://dummyjson.com)         | Product Data Source      |

---

## 📁 Project Structure

```
shop/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Dynamic dark/light top navigation
│   │   ├── ProductCard.jsx  # Reusable product card with redux dispatches
│   ├── redux/               # Redux Toolkit Global State
│   │   ├── filterSlice.js   # Manages sidebar filters globally
│   │   ├── cartSlice.js     # Manages adding/removing items 
│   │   └── wishlistSlice.js # Manages favorites
│   ├── pages/
│   │   ├── Home.jsx         # Landing page with dark editorial hero
│   │   ├── Shop.jsx         # Product catalog with advanced filtering
│   │   ├── cart.jsx         # Shopping cart
│   │   └── ...
│   ├── App.jsx          # Root component with routing
│   ├── index.css        # Global variables (Celine/The Row minimal theme)
│   └── main.jsx         # App entry point (wraps app in Redux Provider)
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and **npm** installed

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yashsoni1110/Shop_Zone.git

# 2. Navigate to the project folder
cd shop

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

---

## 👨‍💻 Author

**Yash Soni**
- GitHub: [@yashsoni1110](https://github.com/yashsoni1110)

> Built with ❤️ using React + Vite + Redux
