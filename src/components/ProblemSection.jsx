import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const StatCard = ({ number, description, delay }) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          animateCounter()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const animateCounter = () => {
    const duration = 2000
    const start = Date.now()
    
    const updateCounter = () => {
      const now = Date.now()
      const progress = Math.min((now - start) / duration, 1)
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      
      const current = Math.floor(easeProgress * number)
      setCount(current)
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      }
    }
    
    updateCounter()
  }

  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B'
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K+'
    }
    return num.toLocaleString()
  }

  return (
    <motion.div 
      ref={ref}
      className="stat-card micro-interaction"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <div className="stat-number">{formatNumber(count)}</div>
      <div className="stat-description">{description}</div>
    </motion.div>
  )
}

const ProblemSection = () => {
  return (
    <section id="problem" className="section">
      <div className="container">
        <motion.div 
          className="fade-in"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>The Problem: <span className="highlight">2.5 Billion</span> Unbanked</h2>
          <p style={{ textAlign: 'center', fontSize: '1.3rem', marginBottom: '3rem', opacity: 0.9 }}>
            Worldwide, billions lack banking access. Traditional financial systems exclude those who need economic opportunities the most.
          </p>
          
          <div className="problem-stats">
            <StatCard 
              number={2500000000} 
              description="People worldwide without banking" 
              delay={0.1}
            />
            <StatCard 
              number={650000} 
              description="Homeless in the US alone" 
              delay={0.2}
            />
            <StatCard 
              number={2000000} 
              description="Formerly incarcerated seeking work" 
              delay={0.3}
            />
          </div>
          
          <motion.div 
            style={{ textAlign: 'center', marginTop: '4rem', fontSize: '1.5rem', fontWeight: 600 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <span style={{ color: '#a855f7' }}>What if we could turn human creativity into instant income?</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProblemSection
