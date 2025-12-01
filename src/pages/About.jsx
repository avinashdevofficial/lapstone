import { motion } from 'framer-motion'
import { Shield, Recycle, Award, Users, CheckCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import './About.css'

function About() {
  const values = [
    {
      icon: <Shield size={32} />,
      title: 'Quality Guaranteed',
      description: 'Every laptop undergoes a rigorous 50-point inspection process by certified technicians before reaching you.'
    },
    {
      icon: <Recycle size={32} />,
      title: 'Sustainable Choice',
      description: 'By choosing refurbished, you help reduce e-waste and give premium technology a second life.'
    },
    {
      icon: <Award size={32} />,
      title: 'Best Value',
      description: 'Get premium laptops at up to 40% off retail prices without compromising on quality or performance.'
    },
    {
      icon: <Users size={32} />,
      title: 'Customer First',
      description: 'Our dedicated support team is available 24/7 to help you find the perfect laptop for your needs.'
    }
  ]

  const process = [
    { step: 1, title: 'Sourcing', description: 'We acquire laptops from verified corporate leases and trade-ins' },
    { step: 2, title: 'Inspection', description: '50-point diagnostic test covering hardware, software, and cosmetics' },
    { step: 3, title: 'Refurbishment', description: 'Professional cleaning, component replacement, and optimization' },
    { step: 4, title: 'Certification', description: 'Final quality check and grading based on condition' },
    { step: 5, title: 'Warranty', description: '12-month comprehensive warranty added to every device' }
  ]

  const stats = [
    { value: '50,000+', label: 'Happy Customers' },
    { value: '15,000+', label: 'Laptops Sold' },
    { value: '99.2%', label: 'Satisfaction Rate' },
    { value: '500+', label: 'Tons E-Waste Saved' }
  ]

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-bg" />
        <div className="container">
          <motion.div
            className="about-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="about-hero-title font-display">
              Technology Deserves a <span className="text-gradient">Second Chance</span>
            </h1>
            <p className="about-hero-description">
              At LapStone, we believe premium technology should be accessible to everyone. 
              We meticulously refurbish high-quality laptops, giving them a new life while 
              offering you exceptional value.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="about-stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <motion.div
            className="section-header-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Why Choose LapStone?</h2>
            <p className="section-description">
              We're redefining what refurbished means with our commitment to quality and customer satisfaction.
            </p>
          </motion.div>

          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="value-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-process">
        <div className="container">
          <motion.div
            className="section-header-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Our Refurbishment Process</h2>
            <p className="section-description">
              Every laptop goes through our rigorous 5-step process to ensure it meets our high standards.
            </p>
          </motion.div>

          <div className="process-timeline">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                className="process-step"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="step-number">{item.step}</div>
                <div className="step-content">
                  <h3 className="step-title">{item.title}</h3>
                  <p className="step-description">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-guarantee">
        <div className="container">
          <motion.div
            className="guarantee-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="guarantee-content">
              <h2 className="guarantee-title">Our Promise to You</h2>
              <ul className="guarantee-list">
                <li><CheckCircle size={20} /> 12-month comprehensive warranty</li>
                <li><CheckCircle size={20} /> 30-day hassle-free returns</li>
                <li><CheckCircle size={20} /> Free express shipping on orders over $500</li>
                <li><CheckCircle size={20} /> Lifetime technical support</li>
                <li><CheckCircle size={20} /> Secure payment & data protection</li>
              </ul>
            </div>
            <div className="guarantee-cta">
              <p>Ready to find your perfect laptop?</p>
              <Link to="/products">
                <Button size="lg" icon={<ArrowRight size={20} />} iconPosition="right">
                  Shop Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About

