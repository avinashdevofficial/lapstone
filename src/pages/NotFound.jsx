import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search, ArrowLeft } from 'lucide-react'
import Button from '../components/Button'
import './NotFound.css'

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="container">
        <motion.div
          className="not-found-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="error-code"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <span className="digit">4</span>
            <motion.div
              className="laptop-icon"
              animate={{ 
                rotateY: [0, 360],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              💻
            </motion.div>
            <span className="digit">4</span>
          </motion.div>

          <h1>Page Not Found</h1>
          <p>
            Oops! The page you're looking for seems to have wandered off. 
            Maybe it's out getting refurbished?
          </p>

          <div className="not-found-actions">
            <Link to="/">
              <Button size="lg" icon={<Home size={18} />}>
                Back to Home
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="secondary" icon={<Search size={18} />}>
                Browse Products
              </Button>
            </Link>
          </div>

          <div className="helpful-links">
            <h3>Helpful Links</h3>
            <div className="links-grid">
              <Link to="/products">Shop All Laptops</Link>
              <Link to="/products?category=gaming">Gaming Laptops</Link>
              <Link to="/products?category=business">Business Laptops</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact Support</Link>
              <Link to="/faq">FAQ</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound

