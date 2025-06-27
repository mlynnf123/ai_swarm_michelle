import React from 'react'
import { motion } from 'framer-motion'

const CaseStudy = ({ name, location, avatar, before, after, vibe, delay }) => (
  <motion.div 
    className="card"
    style={{ marginBottom: '2rem' }}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02, y: -5 }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
      <div style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #a855f7, #6366f1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold'
      }}>
        {avatar}
      </div>
      <div>
        <h4>{name}</h4>
        <p style={{ opacity: 0.7 }}>{location}</p>
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1rem 0' }}>
      <div style={{
        padding: '1rem',
        borderRadius: '10px',
        textAlign: 'center',
        background: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid rgba(239, 68, 68, 0.3)'
      }}>
        <h5>Before AI Swarm</h5>
        {before.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
      <div style={{
        padding: '1rem',
        borderRadius: '10px',
        textAlign: 'center',
        background: 'rgba(16, 185, 129, 0.1)',
        border: '1px solid rgba(16, 185, 129, 0.3)'
      }}>
        <h5>After AI Swarm</h5>
        {after.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
    <div style={{
      background: 'rgba(16, 185, 129, 0.1)',
      padding: '1rem',
      borderRadius: '10px',
      marginTop: '1rem'
    }}>
      <strong>Her vibe:</strong> "{vibe}"
    </div>
  </motion.div>
)

const CaseStudiesSection = () => {
  const caseStudies = [
    {
      name: "Maria Rodriguez",
      location: "Recently released, San Antonio, TX",
      avatar: "M",
      before: [
        "🏠 No permanent address",
        "💼 No employment history",
        "🏛️ No bank account",
        "💡 Great recipe ideas"
      ],
      after: [
        "📱 Recipe-sharing app live",
        "💰 $347 earned in 2 weeks",
        "🪙 0.008 BTC in wallet",
        "⭐ 4.8/5 community rating"
      ],
      vibe: "An app that feels like my grandmother's kitchen—safe, warm, and always has what you need."
    },
    {
      name: "James Chen",
      location: "Homeless veteran, Portland, OR",
      avatar: "J",
      before: [
        "🎒 Living in shelter",
        "💻 No coding experience",
        "🤝 Strong community insight",
        "💭 Ideas for helping others"
      ],
      after: [
        "📲 Resource-finder app",
        "💰 $892 monthly income",
        "🏠 Secured housing",
        "👥 Mentor to 12+ builders"
      ],
      vibe: "Something that feels like finding a hidden treasure map when you're lost."
    },
    {
      name: "Aisha Patel",
      location: "Refugee, language barrier, NYC",
      avatar: "A",
      before: [
        "🌍 New to country",
        "🗣️ Limited English",
        "📄 No credit history",
        "💡 Cultural insights"
      ],
      after: [
        "🌐 Translation community app",
        "💰 $1,245 in 3 months",
        "🤝 Connected 500+ families",
        "🏆 Top validator (92% accuracy)"
      ],
      vibe: "An app that feels like a bridge connecting two worlds that speak different languages."
    }
  ]

  return (
    <section id="cases" className="section">
      <div className="container">
        <motion.div 
          className="fade-in"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2><span className="highlight">Success</span> Stories</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            {caseStudies.map((study, index) => (
              <CaseStudy 
                key={index}
                {...study}
                delay={index * 0.2}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CaseStudiesSection
