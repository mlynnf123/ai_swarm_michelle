import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const CryptoTicker = () => {
  const [appsToday, setAppsToday] = useState(127)
  const [activeBuilders, setActiveBuilders] = useState(1247)

  useEffect(() => {
    const interval = setInterval(() => {
      setAppsToday(prev => prev + Math.floor(Math.random() * 3))
      setActiveBuilders(prev => prev + Math.floor(Math.random() * 5))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const tickerItems = [
    "💰 Total Earned: ₿2.847",
    `📱 Apps Created Today: ${appsToday}`,
    `👥 Active Builders: ${activeBuilders.toLocaleString()}`,
    "⚡ Avg Deploy Time: 12min",
    "🏆 Success Rate: 89%",
    "🌍 Countries: 23",
    "💎 BTC Price: $41,250"
  ]

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(0, 0, 0, 0.9)',
      backdropFilter: 'blur(20px)',
      padding: '1rem',
      borderTop: '1px solid rgba(168, 85, 247, 0.3)',
      zIndex: 1000,
      overflow: 'hidden'
    }}>
      <motion.div 
        style={{
          display: 'flex',
          gap: '2rem',
          whiteSpace: 'nowrap'
        }}
        animate={{ x: [0, -1000] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...tickerItems, ...tickerItems].map((item, index) => (
          <span key={index} style={{ minWidth: 'max-content' }}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default CryptoTicker
