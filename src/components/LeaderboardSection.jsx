import React from 'react'
import { motion } from 'framer-motion'

const LeaderboardItem = ({ rank, name, metric, value, color, delay }) => (
  <motion.div 
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem',
      marginBottom: '1rem',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '10px',
      transition: 'all 0.3s ease'
    }}
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    whileHover={{ 
      background: 'rgba(168, 85, 247, 0.1)',
      x: 10,
      scale: 1.02
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#a855f7',
        marginRight: '1rem'
      }}>
        {rank}
      </div>
      <div>
        <div style={{ fontWeight: 'bold' }}>{name}</div>
        <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>{metric}</div>
      </div>
    </div>
    <div style={{ color, fontWeight: 'bold' }}>{value}</div>
  </motion.div>
)

const LeaderboardSection = () => {
  const topBuilders = [
    { rank: 1, name: "CryptoMaria", metric: "23 apps deployed", value: "₿0.145", color: "#10b981" },
    { rank: 2, name: "VeteranJames", metric: "19 apps deployed", value: "₿0.127", color: "#10b981" },
    { rank: 3, name: "BridgeAisha", metric: "15 apps deployed", value: "₿0.089", color: "#10b981" }
  ]

  const topValidators = [
    { rank: 1, name: "ValidatorEagle", metric: "97% accuracy", value: "2,847 reviews", color: "#6366f1" },
    { rank: 2, name: "SwarmWise", metric: "95% accuracy", value: "2,103 reviews", color: "#6366f1" },
    { rank: 3, name: "CommunityGuru", metric: "94% accuracy", value: "1,856 reviews", color: "#6366f1" }
  ]

  return (
    <section className="section">
      <div className="container">
        <motion.div 
          className="fade-in"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2><span className="highlight">Community</span> Leaderboard</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Top Builders */}
            <motion.div 
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '2rem',
                margin: '2rem 0'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#a855f7' }}>🏆 Top Builders</h3>
              {topBuilders.map((builder, index) => (
                <LeaderboardItem 
                  key={index}
                  {...builder}
                  delay={0.1 * index}
                />
              ))}
            </motion.div>

            {/* Top Validators */}
            <motion.div 
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '2rem',
                margin: '2rem 0'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#6366f1' }}>✅ Top Validators</h3>
              {topValidators.map((validator, index) => (
                <LeaderboardItem 
                  key={index}
                  {...validator}
                  delay={0.1 * index}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default LeaderboardSection
