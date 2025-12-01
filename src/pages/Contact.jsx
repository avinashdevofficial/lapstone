import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react'
import Button from '../components/Button'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email Us',
      details: 'support@lapstone.com',
      subtext: 'We reply within 24 hours'
    },
    {
      icon: <Phone size={24} />,
      title: 'Call Us',
      details: '+1 (234) 567-890',
      subtext: 'Mon-Fri, 9am-6pm EST'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Visit Us',
      details: '123 Tech Street',
      subtext: 'Silicon Valley, CA 94000'
    },
    {
      icon: <Clock size={24} />,
      title: 'Business Hours',
      details: 'Mon - Fri: 9am - 6pm',
      subtext: 'Sat: 10am - 4pm'
    }
  ]

  const faqs = [
    {
      q: 'What is your return policy?',
      a: 'We offer a 30-day hassle-free return policy on all products.'
    },
    {
      q: 'How long does shipping take?',
      a: 'Standard shipping takes 3-5 business days. Express shipping is 1-2 days.'
    },
    {
      q: 'Do you offer international shipping?',
      a: 'Yes, we ship to over 50 countries worldwide.'
    }
  ]

  return (
    <div className="contact-page">
      <div className="container">
        <motion.div
          className="contact-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-subtitle">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            className="contact-info-section"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="info-cards">
              {contactInfo.map((info, index) => (
                <div key={index} className="info-card">
                  <div className="info-icon">{info.icon}</div>
                  <div className="info-content">
                    <h3>{info.title}</h3>
                    <p className="info-details">{info.details}</p>
                    <p className="info-subtext">{info.subtext}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="quick-faqs">
              <h3><MessageSquare size={20} /> Quick FAQs</h3>
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <h4>{faq.q}</h4>
                  <p>{faq.a}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="contact-form-section"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="form-card">
              <h2>Send us a Message</h2>
              
              {isSubmitted ? (
                <motion.div
                  className="success-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="success-icon">✓</div>
                  <h3>Message Sent!</h3>
                  <p>We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Your Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Support</option>
                      <option value="returns">Returns & Refunds</option>
                      <option value="warranty">Warranty Claims</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="How can we help you?"
                      rows={5}
                      required
                    />
                  </div>
                  
                  <Button type="submit" fullWidth size="lg" icon={<Send size={18} />}>
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact

