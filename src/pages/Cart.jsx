import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck, Shield } from 'lucide-react'
import Button from '../components/Button'
import { useCart } from '../App'
import './Cart.css'

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()

  const shippingCost = cartTotal > 500 ? 0 : 49
  const tax = cartTotal * 0.08
  const finalTotal = cartTotal + shippingCost + tax

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <motion.div
          className="empty-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="empty-icon">
            <ShoppingBag size={64} />
          </div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any laptops to your cart yet.</p>
          <Link to="/products">
            <Button size="lg" icon={<ArrowRight size={20} />} iconPosition="right">
              Start Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <motion.div
          className="cart-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="cart-title">Shopping Cart</h1>
          <p className="cart-count">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>
        </motion.div>

        <div className="cart-layout">
          <motion.div
            className="cart-items"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="cart-item"
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Link to={`/product/${item.id}`} className="item-image">
                    <img src={item.image} alt={item.name} />
                  </Link>

                  <div className="item-details">
                    <div className="item-info">
                      <span className="item-brand">{item.brand}</span>
                      <Link to={`/product/${item.id}`} className="item-name">
                        {item.name}
                      </Link>
                      <div className="item-specs">
                        <span>{item.processor}</span>
                        <span>•</span>
                        <span>{item.ram}</span>
                        <span>•</span>
                        <span>{item.storage}</span>
                      </div>
                      <span className="item-condition">{item.condition}</span>
                    </div>

                    <div className="item-actions">
                      <div className="item-quantity">
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="item-pricing">
                        <span className="item-price">${(item.price * item.quantity).toLocaleString()}</span>
                        {item.quantity > 1 && (
                          <span className="item-unit-price">${item.price.toLocaleString()} each</span>
                        )}
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="cart-actions">
              <Link to="/products">
                <Button variant="ghost">Continue Shopping</Button>
              </Link>
              <Button variant="ghost" onClick={clearCart}>
                <Trash2 size={16} />
                Clear Cart
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="order-summary"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="summary-title">Order Summary</h2>

            <div className="promo-code">
              <Tag size={18} />
              <input type="text" placeholder="Enter promo code" />
              <button>Apply</button>
            </div>

            <div className="summary-lines">
              <div className="summary-line">
                <span>Subtotal</span>
                <span>${cartTotal.toLocaleString()}</span>
              </div>
              <div className="summary-line">
                <span>Shipping</span>
                <span className={shippingCost === 0 ? 'free' : ''}>
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost}`}
                </span>
              </div>
              <div className="summary-line">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-line total">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button fullWidth size="lg">
              Proceed to Checkout
            </Button>

            <div className="summary-benefits">
              <div className="summary-benefit">
                <Truck size={18} />
                <span>Free shipping on orders over $500</span>
              </div>
              <div className="summary-benefit">
                <Shield size={18} />
                <span>Secure checkout with encryption</span>
              </div>
            </div>

            <div className="payment-methods">
              <span>We accept:</span>
              <div className="payment-icons">
                <div className="payment-icon">Visa</div>
                <div className="payment-icon">MC</div>
                <div className="payment-icon">Amex</div>
                <div className="payment-icon">PayPal</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Cart

