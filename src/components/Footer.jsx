import React from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer style={{ 
      background: 'rgba(0, 0, 0, 0.8)', 
      padding: '4rem 0', 
      textAlign: 'center', 
      borderTop: '1px solid rgba(168, 85, 247, 0.3)' 
    }}>
      <div className="container">
        <motion.h2 
          style={{ marginBottom: '2rem', fontSize: '2.5rem' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          "This isn't just about apps.<br />It's about dignity, opportunity, and the power of human creativity."
        </motion.h2>
        <motion.p 
          style={{ marginBottom: '3rem', fontSize: '1.2rem', opacity: 0.8 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Revolutionizing app creation for the unbanked
        </motion.p>
        <motion.div 
          className="cta-buttons"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.a 
            className="cta-button"
            href="/dashboard"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🚀 Join the Swarm
          </motion.a>
          <motion.a 
            className="cta-button secondary"
            onClick={() => scrollToSection('economics')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📊 Calculate Earnings
          </motion.a>
        </motion.div>
        
        <motion.div 
          style={{ 
            marginTop: '3rem', 
            paddingTop: '2rem', 
            borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
            opacity: 0.6 
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p>Built with ❤️ for the unbanked community</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
