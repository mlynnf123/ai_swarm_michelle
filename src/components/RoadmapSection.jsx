import React from 'react'
import { motion } from 'framer-motion'

const RoadmapPhase = ({ title, timeframe, items, color, isLeft, delay }) => (
  <motion.div 
    className="roadmap-phase"
    style={{ 
      display: 'flex', 
      alignItems: 'center', 
      marginBottom: '4rem', 
      position: 'relative' 
    }}
    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
  >
    {isLeft ? (
      <>
        <div style={{ flex: 1, textAlign: 'right', paddingRight: '2rem' }}>
          <motion.div 
            className="card"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <h3 style={{ color, marginBottom: '1rem' }}>{title}</h3>
            <div style={{ display: 'grid', gap: '0.5rem', textAlign: 'left' }}>
              {items.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: delay + (index * 0.1) }}
                  viewport={{ once: true }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div 
          style={{
            width: '20px',
            height: '20px',
            background: color,
            borderRadius: '50%',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2
          }}
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <div style={{ flex: 1, paddingLeft: '2rem' }}>
          <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>{timeframe}</div>
        </div>
      </>
    ) : (
      <>
        <div style={{ flex: 1, textAlign: 'right', paddingRight: '2rem' }}>
          <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>{timeframe}</div>
        </div>
        <motion.div 
          style={{
            width: '20px',
            height: '20px',
            background: color,
            borderRadius: '50%',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2
          }}
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <div style={{ flex: 1, paddingLeft: '2rem' }}>
          <motion.div 
            className="card"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <h3 style={{ color, marginBottom: '1rem' }}>{title}</h3>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {items.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: delay + (index * 0.1) }}
                  viewport={{ once: true }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </>
    )}
  </motion.div>
)

const RoadmapSection = () => {
  const phases = [
    {
      title: "🚀 Immediate Launch",
      timeframe: "Next 3 months",
      items: [
        "🤝 Partner with homeless shelters and reentry programs",
        "📱 Develop mobile app for better accessibility",
        "🌍 Add multi-language support for broader reach"
      ],
      color: "#a855f7",
      isLeft: true
    },
    {
      title: "📈 Growth & Enhancement",
      timeframe: "3-9 months",
      items: [
        "🎯 Guild system for specialized app types",
        "💬 Client feedback integration for real-world validation",
        "💰 Advanced payment splitting for collaborative projects"
      ],
      color: "#6366f1",
      isLeft: false
    },
    {
      title: "🌍 Global Impact",
      timeframe: "Year 1+",
      items: [
        "🌐 Global expansion with local crypto partnerships",
        "🤖 AI-powered vibe translation to 20+ languages",
        "🏢 Corporate partnerships for app distribution"
      ],
      color: "#8b5cf6",
      isLeft: true
    }
  ]

  return (
    <section id="roadmap" className="section">
      <div className="container">
        <motion.div 
          className="fade-in"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Roadmap & <span className="highlight">What's Next</span></h2>
          
          <div className="roadmap-timeline" style={{ position: 'relative', marginTop: '4rem' }}>
            {/* Timeline line */}
            <motion.div 
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '4px',
                height: '100%',
                background: 'linear-gradient(to bottom, #a855f7, #6366f1)',
                borderRadius: '2px'
              }}
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
            
            {phases.map((phase, index) => (
              <RoadmapPhase 
                key={index}
                {...phase}
                delay={index * 0.3}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default RoadmapSection
