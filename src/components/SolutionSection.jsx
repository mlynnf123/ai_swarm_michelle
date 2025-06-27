import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const SwarmCanvas = () => {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    canvas.width = canvas.offsetWidth
    canvas.height = 400
    
    const nodes = []
    
    // Create nodes representing swarm members
    for (let i = 0; i < 15; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 8 + 4,
        color: `hsl(${250 + Math.random() * 60}, 70%, 60%)`,
        pulse: Math.random() * Math.PI * 2
      })
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx
        node.y += node.vy
        node.pulse += 0.1
        
        // Bounce off edges
        if (node.x <= node.radius || node.x >= canvas.width - node.radius) {
          node.vx *= -1
        }
        if (node.y <= node.radius || node.y >= canvas.height - node.radius) {
          node.vy *= -1
        }
        
        // Draw connections to nearby nodes
        nodes.forEach((otherNode, j) => {
          if (i < j) {
            const dx = node.x - otherNode.x
            const dy = node.y - otherNode.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < 120) {
              const opacity = (120 - distance) / 120 * 0.3
              ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(node.x, node.y)
              ctx.lineTo(otherNode.x, otherNode.y)
              ctx.stroke()
            }
          }
        })
        
        // Draw node
        const pulseSize = Math.sin(node.pulse) * 2
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius + pulseSize, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()
        
        // Add glow effect
        ctx.shadowColor = node.color
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0
      })
      
      requestAnimationFrame(animate)
    }
    
    animate()
    
    // Handle resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = 400
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <canvas 
      ref={canvasRef}
      style={{
        width: '100%',
        height: '400px',
        borderRadius: '15px',
        background: 'rgba(0, 0, 0, 0.3)',
        margin: '2rem 0'
      }}
    />
  )
}

const SolutionSection = () => {
  return (
    <section id="solution" className="section">
      <div className="container">
        <motion.div 
          className="fade-in"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Our Solution: <span className="highlight">AI Swarm</span></h2>
          
          {/* Technology Stack Visualization */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', margin: '4rem 0', flexWrap: 'wrap' }}>
            <motion.div 
              className="card micro-interaction" 
              style={{ textAlign: 'center', padding: '1.5rem' }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
              <h4>Swarm Intelligence</h4>
              <p style={{ opacity: 0.8 }}>Collective Validation</p>
            </motion.div>
            <div style={{ fontSize: '2rem', color: '#a855f7', alignSelf: 'center' }}>+</div>
            <motion.div 
              className="card micro-interaction" 
              style={{ textAlign: 'center', padding: '1.5rem' }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
              <h4>Instant Deploy</h4>
              <p style={{ opacity: 0.8 }}>Bolt.new Integration</p>
            </motion.div>
            <div style={{ fontSize: '2rem', color: '#a855f7', alignSelf: 'center' }}>+</div>
            <motion.div 
              className="card micro-interaction" 
              style={{ textAlign: 'center', padding: '1.5rem' }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🪙</div>
              <h4>Crypto Rewards</h4>
              <p style={{ opacity: 0.8 }}>No Banks Needed</p>
            </motion.div>
          </div>

          {/* Interactive 3D Swarm Visualization */}
          <motion.div 
            className="card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>🌐 Live Swarm Collaboration</h3>
            <SwarmCanvas />
            <p style={{ textAlign: 'center', opacity: 0.7, marginTop: '1rem' }}>
              Watch ideas evolve in real-time as the swarm validates and improves them
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default SolutionSection
