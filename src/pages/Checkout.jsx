import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CreditCard, Truck, Shield, ChevronLeft, Check, Lock } from 'lucide-react'
import Button from '../components/Button'
import { useCart } from '../App'
import './Checkout.css'

function Checkout() {
  const navigate = useNavigate()
  const { cartItems, cartTotal, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    saveInfo: false
  })

  const shippingCost = cartTotal > 500 ? 0 : 49
  const tax = cartTotal * 0.08
  const finalTotal = cartTotal + shippingCost + tax

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        setOrderComplete(true)
        clearCart()
      }, 2000)
    }
  }

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <p>Add some items before checking out.</p>
        <Link to="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="checkout-page">
        <div className="container">
          <motion.div
            className="order-success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="success-icon">
              <Check size={48} />
            </div>
            <h1>Order Confirmed!</h1>
            <p className="order-number">Order #LS{Date.now().toString().slice(-8)}</p>
            <p className="success-message">
              Thank you for your purchase! You'll receive an email confirmation shortly with your order details and tracking information.
            </p>
            <div className="success-actions">
              <Link to="/products">
                <Button size="lg">Continue Shopping</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <Link to="/cart" className="back-link">
            <ChevronLeft size={20} />
            <span>Back to Cart</span>
          </Link>
          <h1>Checkout</h1>
        </div>

        <div className="checkout-steps">
          {['Shipping', 'Payment', 'Review'].map((label, index) => (
            <div
              key={label}
              className={`step ${step > index + 1 ? 'completed' : ''} ${step === index + 1 ? 'active' : ''}`}
            >
              <div className="step-number">
                {step > index + 1 ? <Check size={16} /> : index + 1}
              </div>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="checkout-grid">
          <motion.div
            className="checkout-form-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="form-section">
                  <h2><Truck size={20} /> Shipping Information</h2>
                  
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street address"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Apartment, suite, etc. (optional)</label>
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-row form-row-3">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 555-5555"
                      required
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="form-section">
                  <h2><CreditCard size={20} /> Payment Method</h2>
                  
                  <div className="payment-options">
                    <label className="payment-option active">
                      <input type="radio" name="payment" defaultChecked />
                      <span className="option-content">
                        <CreditCard size={20} />
                        <span>Credit / Debit Card</span>
                      </span>
                    </label>
                  </div>

                  <div className="card-form">
                    <div className="form-group">
                      <label>Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Name on Card</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Expiry Date</label>
                        <input
                          type="text"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="secure-badge">
                    <Lock size={16} />
                    <span>Your payment information is encrypted and secure</span>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="form-section">
                  <h2><Shield size={20} /> Review Order</h2>
                  
                  <div className="review-section">
                    <h3>Shipping Address</h3>
                    <p>
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.apartment && <>{formData.apartment}<br /></>}
                      {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                  </div>

                  <div className="review-section">
                    <h3>Payment Method</h3>
                    <p>Card ending in {formData.cardNumber.slice(-4) || '****'}</p>
                  </div>

                  <div className="review-section">
                    <h3>Items ({cartItems.length})</h3>
                    <div className="review-items">
                      {cartItems.map(item => (
                        <div key={item.id} className="review-item">
                          <img src={item.image} alt={item.name} />
                          <div className="review-item-info">
                            <span className="item-name">{item.name}</span>
                            <span className="item-qty">Qty: {item.quantity}</span>
                          </div>
                          <span className="item-price">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="form-actions">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  type="submit"
                  size="lg"
                  loading={isProcessing}
                  className="submit-btn"
                >
                  {step < 3 ? 'Continue' : `Pay $${finalTotal.toFixed(2)}`}
                </Button>
              </div>
            </form>
          </motion.div>

          <motion.div
            className="order-summary-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="summary-card">
              <h2>Order Summary</h2>
              
              <div className="summary-items">
                {cartItems.map(item => (
                  <div key={item.id} className="summary-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                      <span className="item-qty-badge">{item.quantity}</span>
                    </div>
                    <div className="item-details">
                      <span className="item-name">{item.name}</span>
                      <span className="item-variant">{item.condition}</span>
                    </div>
                    <span className="item-price">${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="total-line">
                  <span>Subtotal</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
                <div className="total-line">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? 'free' : ''}>
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost}`}
                  </span>
                </div>
                <div className="total-line">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="total-line total">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Checkout

