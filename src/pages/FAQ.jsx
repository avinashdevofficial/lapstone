import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search, HelpCircle, Package, Truck, Shield, CreditCard, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import './FAQ.css'

function FAQ() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [openItems, setOpenItems] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', name: 'All Questions', icon: <HelpCircle size={18} /> },
    { id: 'orders', name: 'Orders', icon: <Package size={18} /> },
    { id: 'shipping', name: 'Shipping', icon: <Truck size={18} /> },
    { id: 'warranty', name: 'Warranty', icon: <Shield size={18} /> },
    { id: 'payment', name: 'Payment', icon: <CreditCard size={18} /> },
    { id: 'returns', name: 'Returns', icon: <RotateCcw size={18} /> }
  ]

  const faqs = [
    {
      id: 1,
      category: 'orders',
      question: 'How do I track my order?',
      answer: 'Once your order ships, you\'ll receive an email with a tracking number. You can use this number to track your package on our website or the carrier\'s website. You can also log into your account to view order status.'
    },
    {
      id: 2,
      category: 'orders',
      question: 'Can I modify or cancel my order?',
      answer: 'You can modify or cancel your order within 1 hour of placing it. After that, the order enters processing and cannot be changed. Please contact our support team immediately if you need to make changes.'
    },
    {
      id: 3,
      category: 'shipping',
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days within the continental US. Express shipping (1-2 business days) is available for an additional fee. International shipping typically takes 7-14 business days.'
    },
    {
      id: 4,
      category: 'shipping',
      question: 'Do you offer free shipping?',
      answer: 'Yes! We offer free standard shipping on all orders over $500. Orders under $500 have a flat shipping rate of $49.'
    },
    {
      id: 5,
      category: 'shipping',
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to over 50 countries worldwide. International shipping costs and delivery times vary by location. You can see the exact cost at checkout.'
    },
    {
      id: 6,
      category: 'warranty',
      question: 'What does the warranty cover?',
      answer: 'Our 12-month warranty covers all hardware defects and malfunctions. This includes the display, keyboard, trackpad, battery, and all internal components. Physical damage, water damage, and software issues are not covered.'
    },
    {
      id: 7,
      category: 'warranty',
      question: 'How do I claim warranty service?',
      answer: 'Contact our support team with your order number and a description of the issue. We\'ll guide you through the diagnostic process and arrange for repair or replacement if needed. We cover return shipping for warranty claims.'
    },
    {
      id: 8,
      category: 'warranty',
      question: 'Can I extend my warranty?',
      answer: 'Yes! You can purchase an extended warranty within 30 days of your original purchase. We offer 2-year and 3-year extended warranty options.'
    },
    {
      id: 9,
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and financing through Affirm for qualified customers.'
    },
    {
      id: 10,
      category: 'payment',
      question: 'Is my payment information secure?',
      answer: 'Absolutely. We use industry-standard SSL encryption and are PCI-DSS compliant. Your payment information is processed securely and never stored on our servers.'
    },
    {
      id: 11,
      category: 'payment',
      question: 'Do you offer financing options?',
      answer: 'Yes, we partner with Affirm to offer flexible financing. You can split your purchase into monthly payments with rates as low as 0% APR for qualified customers.'
    },
    {
      id: 12,
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy. Items must be in original condition with all accessories and packaging. Refunds are processed within 5-7 business days of receiving the return.'
    },
    {
      id: 13,
      category: 'returns',
      question: 'How do I initiate a return?',
      answer: 'Log into your account and go to Order History, then click "Return Item" next to the product you want to return. You\'ll receive a prepaid shipping label via email.'
    },
    {
      id: 14,
      category: 'returns',
      question: 'Are there any restocking fees?',
      answer: 'No, we don\'t charge restocking fees for returns in original condition. However, items with signs of use or missing accessories may be subject to a reduced refund.'
    }
  ]

  const toggleItem = (id) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="faq-page">
      <div className="container">
        <motion.div
          className="faq-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="faq-title">Frequently Asked Questions</h1>
          <p className="faq-subtitle">
            Find answers to common questions about our products, shipping, and policies.
          </p>
          
          <div className="faq-search">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        <div className="faq-categories">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        <motion.div className="faq-list" layout>
          <AnimatePresence>
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                className={`faq-item ${openItems.includes(faq.id) ? 'open' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <button
                  className="faq-question"
                  onClick={() => toggleItem(faq.id)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown size={20} className="chevron" />
                </button>
                <AnimatePresence>
                  {openItems.includes(faq.id) && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredFaqs.length === 0 && (
            <div className="no-results">
              <HelpCircle size={48} />
              <h3>No results found</h3>
              <p>Try adjusting your search or browse all categories.</p>
            </div>
          )}
        </motion.div>

        <motion.div
          className="faq-contact"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Still have questions?</h2>
          <p>Our support team is here to help you with anything you need.</p>
          <Link to="/contact">
            <Button size="lg">Contact Support</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default FAQ

