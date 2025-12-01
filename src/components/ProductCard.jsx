import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Star, Cpu, HardDrive, Monitor } from 'lucide-react'
import { useCart } from '../App'
import './ProductCard.css'

function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const conditionClass = product.condition.toLowerCase().replace(' ', '-')

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
          <div className="product-badges">
            <span className={`condition-badge ${conditionClass}`}>
              {product.condition}
            </span>
            {product.discount >= 30 && (
              <span className="hot-badge">Hot Deal</span>
            )}
          </div>
          <div className="product-overlay">
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>

        <div className="product-info">
          <div className="product-brand">{product.brand}</div>
          <h3 className="product-name">{product.name}</h3>
          
          <div className="product-specs">
            <div className="spec">
              <Cpu size={14} />
              <span>{product.processor.split(' ').slice(-1)[0]}</span>
            </div>
            <div className="spec">
              <HardDrive size={14} />
              <span>{product.storage}</span>
            </div>
            <div className="spec">
              <Monitor size={14} />
              <span>{product.ram}</span>
            </div>
          </div>

          <div className="product-rating">
            <Star size={14} fill="var(--accent-secondary)" color="var(--accent-secondary)" />
            <span className="rating-value">{product.rating}</span>
            <span className="rating-count">({product.reviews})</span>
          </div>

          <div className="product-pricing">
            <div className="price-current">${product.price.toLocaleString()}</div>
            <div className="price-original">${product.originalPrice.toLocaleString()}</div>
            <div className="price-discount">-{product.discount}%</div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard

