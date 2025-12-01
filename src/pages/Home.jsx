import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Truck, RefreshCw, Award, ChevronRight, Sparkles } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import Button from '../components/Button'
import { products, categories } from '../data/products'
import './Home.css'

function Home() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4)
  const hotDeals = products.filter(p => p.discount >= 30).slice(0, 3)

  const features = [
    {
      icon: <Shield size={28} />,
      title: 'Certified Quality',
      description: 'Every laptop undergoes 50+ point inspection by certified technicians'
    },
    {
      icon: <RefreshCw size={28} />,
      title: '12-Month Warranty',
      description: 'Full coverage warranty with hassle-free replacement guarantee'
    },
    {
      icon: <Truck size={28} />,
      title: 'Free Shipping',
      description: 'Fast, insured delivery on all orders over $500'
    },
    {
      icon: <Award size={28} />,
      title: 'Save Up to 40%',
      description: 'Premium laptops at a fraction of the retail price'
    }
  ]

  const stats = [
    { value: '50K+', label: 'Happy Customers' },
    { value: '99.2%', label: 'Satisfaction Rate' },
    { value: '15K+', label: 'Laptops Sold' },
    { value: '24/7', label: 'Support Available' }
  ]

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-gradient" />
          <div className="hero-pattern" />
          <div className="hero-glow" />
        </div>
        
        <div className="container hero-container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles size={16} />
              <span>Premium Refurbished Laptops</span>
            </motion.div>

            <h1 className="hero-title">
              Technology Reborn.
              <span className="hero-title-accent"> Performance Preserved.</span>
            </h1>

            <p className="hero-description">
              Discover premium refurbished laptops from Apple, Dell, Lenovo & more. 
              Certified quality, unbeatable prices, and backed by our comprehensive warranty.
            </p>

            <div className="hero-actions">
              <Link to="/products">
                <Button size="lg" icon={<ArrowRight size={20} />} iconPosition="right">
                  Shop Now
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="secondary" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="hero-stats">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="hero-stat"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="hero-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"
                alt="MacBook Pro"
                className="hero-image"
              />
              <div className="hero-image-glow" />
            </div>
            <motion.div
              className="floating-card card-price"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <span className="floating-label">Save up to</span>
              <span className="floating-value">40%</span>
            </motion.div>
            <motion.div
              className="floating-card card-warranty"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3.5 }}
            >
              <Shield size={20} />
              <span>12-Month Warranty</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">
              Browse by <span className="text-gradient">Category</span>
            </h2>
            <p className="section-subtitle">
              Find the perfect laptop for your needs
            </p>
          </motion.div>

          <div className="categories-grid">
            {categories.filter(c => c.id !== 'all').map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/products?category=${category.id}`}
                  className="category-card"
                >
                  <div className="category-content">
                    <h3 className="category-name">{category.name}</h3>
                    <span className="category-count">
                      {products.filter(p => p.category === category.id).length} laptops
                    </span>
                  </div>
                  <ChevronRight size={20} className="category-arrow" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">
              Featured <span className="text-gradient">Laptops</span>
            </h2>
            <Link to="/products" className="section-link">
              View All <ArrowRight size={18} />
            </Link>
          </motion.div>

          <div className="products-grid">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="deals-section">
        <div className="deals-bg" />
        <div className="container">
          <motion.div
            className="deals-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="deals-badge">🔥 Limited Time</div>
            <h2 className="deals-title">Hot Deals</h2>
            <p className="deals-subtitle">
              Incredible savings on premium refurbished laptops
            </p>
          </motion.div>

          <div className="deals-grid">
            {hotDeals.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="trust-section">
        <div className="container">
          <motion.div
            className="trust-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="trust-title font-display">
              Why Choose <span className="text-gradient">LapStone</span>?
            </h2>
            <p className="trust-description">
              We're not just selling refurbished laptops – we're giving premium technology 
              a second life while saving you money and reducing e-waste. Every device is 
              meticulously inspected, certified, and backed by our industry-leading warranty.
            </p>
            <div className="trust-cta">
              <Link to="/about">
                <Button size="lg" variant="outline">
                  Our Story
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="newsletter-section">
        <div className="container">
          <motion.div
            className="newsletter-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="newsletter-content">
              <h3 className="newsletter-title">
                Get Exclusive Deals
              </h3>
              <p className="newsletter-description">
                Subscribe to our newsletter for special offers, new arrivals, and insider-only discounts.
              </p>
            </div>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home

