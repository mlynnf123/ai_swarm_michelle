import React, { useState } from 'react'
import { motion } from 'framer-motion'

const EconomicsSection = () => {
  const [appsPerWeek, setAppsPerWeek] = useState(3)
  const [reviewsPerDay, setReviewsPerDay] = useState(10)
  const [avgUsage, setAvgUsage] = useState(1000)

  const calculateEarnings = () => {
    const appEarnings = appsPerWeek * 4 * (avgUsage * 0.001)
    const reviewEarnings = reviewsPerDay * 30 * 0.5
    const totalMonthly = appEarnings + reviewEarnings
    const btcEquivalent = totalMonthly / 41250
    
    return {
      monthly: Math.round(totalMonthly),
      btc: btcEquivalent.toFixed(6)
    }
  }

  const earnings = calculateEarnings()

  return (
    <section id="economics" className="section">
      <div className="container">
        <motion.div 
          className="fade-in"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2><span className="highlight">Economics</span> Calculator</h2>
          <p style={{ textAlign: 'center', fontSize: '1.3rem', marginBottom: '3rem', opacity: 0.9 }}>
            Calculate your potential earnings from the AI Swarm ecosystem
          </p>
          
          <motion.div 
            style={{
              background: 'rgba(16, 185, 129, 0.1)',
              borderRadius: '20px',
              padding: '2rem',
              margin: '2rem 0',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 style={{ textAlign: 'center', marginBottom: '2rem', color: '#10b981' }}>💰 Earnings Potential</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Apps per week: {appsPerWeek}</label>
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  value={appsPerWeek}
                  onChange={(e) => setAppsPerWeek(parseInt(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Reviews per day: {reviewsPerDay}</label>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  value={reviewsPerDay}
                  onChange={(e) => setReviewsPerDay(parseInt(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Avg users/month: {avgUsage.toLocaleString()}</label>
                <input 
                  type="range" 
                  min="100" 
                  max="10000" 
                  value={avgUsage}
                  onChange={(e) => setAvgUsage(parseInt(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
            <motion.div 
              style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', color: '#10b981', marginTop: '1rem' }}
              key={earnings.monthly}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div>Monthly Earnings: ${earnings.monthly}</div>
              <div style={{ fontSize: '1rem', opacity: 0.8, marginTop: '0.5rem' }}>
                ≈ {earnings.btc} BTC
              </div>
            </motion.div>
          </motion.div>

          {/* Revenue Model */}
          <motion.div 
            className="card" 
            style={{ marginTop: '3rem' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>📊 Revenue Distribution</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
              <motion.div 
                style={{ textAlign: 'center' }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div style={{ fontSize: '3rem', color: '#10b981', marginBottom: '1rem' }}>95%</div>
                <h4>Builders</h4>
                <p>Creators earn 95% from app usage</p>
              </motion.div>
              <motion.div 
                style={{ textAlign: 'center' }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div style={{ fontSize: '3rem', color: '#a855f7', marginBottom: '1rem' }}>5%</div>
                <h4>Platform</h4>
                <p>Sustainable ecosystem development</p>
              </motion.div>
              <motion.div 
                style={{ textAlign: 'center' }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div style={{ fontSize: '3rem', color: '#6366f1', marginBottom: '1rem' }}>∞</div>
                <h4>Validators</h4>
                <p>Micro-payments per quality review</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default EconomicsSection
