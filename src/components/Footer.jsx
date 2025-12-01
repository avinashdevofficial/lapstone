import { Link } from 'react-router-dom'
import { Laptop, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">
                <Laptop size={24} />
              </div>
              <span className="footer-logo-text">
                Lap<span className="logo-accent">Stone</span>
              </span>
            </Link>
            <p className="footer-description">
              Premium refurbished laptops with verified quality and unbeatable prices. Every device is certified, tested, and backed by our 12-month warranty.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4 className="footer-title">Shop</h4>
            <ul>
              <li><Link to="/products">All Laptops</Link></li>
              <li><Link to="/products?category=gaming">Gaming Laptops</Link></li>
              <li><Link to="/products?category=business">Business Laptops</Link></li>
              <li><Link to="/products?category=ultrabook">Ultrabooks</Link></li>
              <li><Link to="/products?category=workstation">Workstations</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4 className="footer-title">Support</h4>
            <ul>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><a href="#">Warranty Information</a></li>
              <li><a href="#">Return Policy</a></li>
              <li><a href="#">Shipping Info</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-title">Contact</h4>
            <ul className="contact-list">
              <li>
                <Mail size={16} />
                <a href="mailto:support@lapstone.com">support@lapstone.com</a>
              </li>
              <li>
                <Phone size={16} />
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </li>
              <li>
                <MapPin size={16} />
                <span>123 Tech Street, Silicon Valley, CA 94000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 LapStone. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
