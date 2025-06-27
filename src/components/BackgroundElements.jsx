import React, { useEffect, useState } from 'react'

const BackgroundElements = () => {
  const [particles, setParticles] = useState([])
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    // Scroll progress
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const maxHeight = document.body.scrollHeight - window.innerHeight
      const progress = (scrolled / maxHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Particle system
    const createParticle = () => {
      const id = Math.random()
      const newParticle = {
        id,
        left: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 10 + 15,
        opacity: Math.random() * 0.5 + 0.3
      }
      
      setParticles(prev => [...prev, newParticle])
      
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== id))
      }, newParticle.duration * 1000)
    }

    const interval = setInterval(() => {
      if (particles.length < 20) {
        createParticle()
      }
    }, 500)

    return () => clearInterval(interval)
  }, [particles.length])

  return (
    <>
      <div className="bg-canvas" />
      <div className="particle-container">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              opacity: particle.opacity
            }}
          />
        ))}
      </div>
      <div 
        className="scroll-progress" 
        style={{ width: `${scrollProgress}%` }}
      />
    </>
  )
}

export default BackgroundElements
