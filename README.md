# LapStone - Premium Refurbished Laptops

A modern e-commerce website for refurbished laptops, built with React + Vite.

## Features

- 🛒 **Full Shopping Experience** - Browse products, filter by category/brand, add to cart
- 🎨 **Modern Dark UI** - Distinctive design with warm accent colors and smooth animations
- 📱 **Fully Responsive** - Works beautifully on desktop, tablet, and mobile
- ⚡ **Fast & Optimized** - Built with Vite for lightning-fast development and builds
- 🛡️ **Cart Persistence** - Cart items saved to localStorage
- 🔍 **Search & Filter** - Find laptops by category, brand, condition, and price

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Next-generation frontend build tool
- **React Router v6** - Client-side routing
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library
- **CSS3** - Custom properties, gradients, and animations

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Header.jsx     # Navigation header
│   ├── Footer.jsx     # Site footer
│   ├── ProductCard.jsx # Product display card
│   └── Button.jsx     # Reusable button component
├── pages/             # Page components
│   ├── Home.jsx       # Homepage with hero & featured products
│   ├── Products.jsx   # Product listing with filters
│   ├── ProductDetail.jsx # Individual product page
│   ├── Cart.jsx       # Shopping cart
│   └── About.jsx      # About page
├── data/
│   └── products.js    # Product catalog data
├── App.jsx            # Main app component with cart context
├── main.jsx           # App entry point
└── index.css          # Global styles
```

## License

MIT License

