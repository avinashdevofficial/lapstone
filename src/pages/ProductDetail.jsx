import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ShoppingCart, Heart, Share2, Check,
  Shield, Truck, RotateCcw, Star, Minus, Plus, Cpu, HardDrive, Monitor, Zap
} from 'lucide-react'
import Button from '../components/Button'
import ProductCard from '../components/ProductCard'
import { useCart } from '../App'
import { products } from '../data/products'
import './ProductDetail.css'

function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const product = products.find(p => p.id === parseInt(id))

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <Link to="/products">
          <Button>Back to Shop</Button>
        </Link>
      </div>
    )
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const specs = [
    { icon: <Cpu size={20} />, label: 'Processor', value: product.processor },
    { icon: <Monitor size={20} />, label: 'Display', value: product.display },
    { icon: <HardDrive size={20} />, label: 'Storage', value: product.storage },
    { icon: <Zap size={20} />, label: 'RAM', value: product.ram },
    ...(product.gpu ? [{ icon: <Zap size={20} />, label: 'Graphics', value: product.gpu }] : [])
  ]

  const benefits = [
    { icon: <Shield size={18} />, text: `${product.warranty} Warranty` },
    { icon: <Truck size={18} />, text: 'Free Express Shipping' },
    { icon: <RotateCcw size={18} />, text: '30-Day Returns' }
  ]

  return (
    <div className="product-detail">
      <div className="container">
        <motion.nav
          className="breadcrumb"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Shop</Link>
          <span>/</span>
          <span className="current">{product.name}</span>
        </motion.nav>

        <div className="product-detail-grid">
          <motion.div
            className="product-gallery"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="gallery-main">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="gallery-image"
              />
              <div className="gallery-badges">
                <span className="badge-condition">{product.condition}</span>
                <span className="badge-discount">-{product.discount}%</span>
              </div>
            </div>
            <div className="gallery-thumbs">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`gallery-thumb ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} view ${index + 1}`} />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="product-info-detail"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="product-brand-badge">{product.brand}</div>
            <h1 className="product-title">{product.name}</h1>

            <div className="product-meta">
              <div className="product-rating-detail">
                <Star size={18} fill="var(--accent-secondary)" color="var(--accent-secondary)" />
                <span className="rating-score">{product.rating}</span>
                <span className="rating-reviews">({product.reviews} reviews)</span>
              </div>
              <div className="product-stock">
                <Check size={16} />
                <span>{product.stock > 5 ? 'In Stock' : `Only ${product.stock} left`}</span>
              </div>
            </div>

            <p className="product-description">{product.description}</p>

            <div className="product-specs-grid">
              {specs.map((spec, index) => (
                <div key={index} className="spec-item">
                  <div className="spec-icon">{spec.icon}</div>
                  <div className="spec-content">
                    <span className="spec-label">{spec.label}</span>
                    <span className="spec-value">{spec.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="product-pricing-detail">
              <div className="price-main">${product.price.toLocaleString()}</div>
              <div className="price-original-detail">
                ${product.originalPrice.toLocaleString()}
              </div>
              <div className="price-savings">
                Save ${(product.originalPrice - product.price).toLocaleString()}
              </div>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={18} />
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus size={18} />
                </button>
              </div>

              <Button
                size="lg"
                icon={<ShoppingCart size={20} />}
                onClick={handleAddToCart}
                className="add-cart-btn"
              >
                Add to Cart
              </Button>

              <button
                className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                onClick={() => setIsWishlisted(!isWishlisted)}
                aria-label="Add to wishlist"
              >
                <Heart size={22} fill={isWishlisted ? 'var(--accent-primary)' : 'none'} />
              </button>

              <button className="share-btn" aria-label="Share product">
                <Share2 size={20} />
              </button>
            </div>

            <div className="product-benefits">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  {benefit.icon}
                  <span>{benefit.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="related-products">
            <h2 className="related-title">You Might Also Like</h2>
            <div className="related-grid">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default ProductDetail

