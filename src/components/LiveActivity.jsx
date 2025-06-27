import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LiveActivity = () => {
  const [activities, setActivities] = useState([])
  const [isVisible, setIsVisible] = useState(true)

  const activityTemplates = [
    "🚀 Maria deployed 'Community Recipe Hub' - earning ₿0.003",
    "✅ James validated 5 apps - +15 reputation points",
    "💡 New vibe: 'An app that feels like Sunday morning coffee'",
    "🎯 Aisha's translation app hit 1000 users!",
    "⚡ CodeMaster deployed in 8 minutes - new record!",
    "🏆 ValidatorEagle reached 95% accuracy milestone",
    "🌍 First app deployed from Brazil - global expansion!",
    "💰 Total daily earnings: ₿0.147 and counting...",
    "🤝 New shelter partnership in Denver, CO",
    "📱 Mobile app beta launched with 50 testers"
  ]

  useEffect(() => {
    // Initialize with some activities
    const initialActivities = activityTemplates.slice(0, 5).map((text, index) => ({
      id: index,
      text,
      timestamp: Date.now() - (index * 1000)
    }))
    setActivities(initialActivities)

    // Add new activities periodically
    const interval = setInterval(() => {
      const randomActivity = activityTemplates[Math.floor(Math.random() * activityTemplates.length)]
      const newActivity = {
        id: Date.now(),
        text: randomActivity,
        timestamp: Date.now()
      }

      setActivities(prev => [newActivity, ...prev.slice(0, 7)]) // Keep only 8 items
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Hide on mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsVisible(window.innerWidth > 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div 
      style={{
        position: 'fixed',
        top: '50%',
        right: '2rem',
        transform: 'translateY(-50%)',
        width: '300px',
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(20px)',
        borderRadius: '15px',
        padding: '1rem',
        border: '1px solid rgba(168, 85, 247, 0.3)',
        zIndex: 100,
        maxHeight: '400px',
        overflowY: 'auto'
      }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h4 style={{ marginBottom: '1rem', color: '#a855f7' }}>🔴 Live Activity</h4>
      <div>
        <AnimatePresence>
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              style={{
                padding: '0.5rem',
                marginBottom: '0.5rem',
                borderRadius: '8px',
                background: 'rgba(168, 85, 247, 0.1)',
                fontSize: '0.9rem'
              }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              {activity.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default LiveActivity
