import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingCart, Trash2, Share2 } from 'lucide-react'
import Button from '../components/Button'
import { useCart } from '../App'
import { products } from '../data/products'
import './Wishlist.css'

function Wishlist() {
  const { addToCart } = useCart()
  // Demo wishlist - in a real app this would be managed by context/state
  const [wishlistItems, setWishlistItems] = useState([
    products[0],
    products[2],
    products[4]
  ])

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId))
  }

  const handleAddToCart = (product) => {
    addToCart(product)
    removeFromWishlist(product.id)
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="container">
          <div className="wishlist-empty">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="empty-icon">
                <Heart size={64} />
              </div>
              <h2>Your Wishlist is Empty</h2>
              <p>Save items you love by clicking the heart icon on any product.</p>
              <Link to="/products">
                <Button size="lg">Explore Products</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <motion.div
          className="wishlist-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="header-content">
            <h1>My Wishlist</h1>
            <p>{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved</p>
          </div>
          <button className="share-wishlist">
            <Share2 size={18} />
            <span>Share Wishlist</span>
          </button>
        </motion.div>

        <motion.div
          className="wishlist-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <AnimatePresence mode="popLayout">
            {wishlistItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="wishlist-card"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/product/${item.id}`} className="card-image">
                  <img src={item.image} alt={item.name} />
                  <span className="discount-badge">-{item.discount}%</span>
                </Link>

                <div className="card-content">
                  <div className="card-header">
                    <span className="brand">{item.brand}</span>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromWishlist(item.id)}
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <Link to={`/product/${item.id}`} className="card-title">
                    {item.name}
                  </Link>

                  <div className="card-specs">
                    <span>{item.processor}</span>
                    <span>•</span>
                    <span>{item.ram}</span>
                    <span>•</span>
                    <span>{item.storage}</span>
                  </div>

                  <div className="card-footer">
                    <div className="pricing">
                      <span className="current-price">${item.price.toLocaleString()}</span>
                      <span className="original-price">${item.originalPrice.toLocaleString()}</span>
                    </div>
                    <Button
                      size="sm"
                      icon={<ShoppingCart size={16} />}
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </Button>
                  </div>

                  <div className="stock-status">
                    {item.stock > 5 ? (
                      <span className="in-stock">In Stock</span>
                    ) : (
                      <span className="low-stock">Only {item.stock} left</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="wishlist-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="outline"
            onClick={() => wishlistItems.forEach(item => handleAddToCart(item))}
          >
            <ShoppingCart size={18} />
            Add All to Cart
          </Button>
          <Button
            variant="ghost"
            onClick={() => setWishlistItems([])}
          >
            <Trash2 size={18} />
            Clear Wishlist
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

export default Wishlist

