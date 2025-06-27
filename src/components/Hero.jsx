import React from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="hero">
      <div className="container">
        <motion.div 
          className="hero-content fade-in"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>AI SWARM</h1>
          <p>Empowering the Unbanked Through Decentralized App Creation</p>
          <div className="tagline">Where good vibes become good apps become good money.</div>
          <div className="cta-buttons">
            <a 
              className="cta-button" 
              onClick={() => scrollToSection('demo')}
            >
              Start Building Now
            </a>
            <a 
              className="cta-button secondary" 
              onClick={() => scrollToSection('demo')}
            >
              🎤 Try Voice Demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
