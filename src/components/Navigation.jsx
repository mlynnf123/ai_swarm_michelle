import React, { useState, useEffect } from 'react'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [liveUsers, setLiveUsers] = useState(1247)
  const [appsToday, setAppsToday] = useState(89)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers(prev => prev + Math.floor(Math.random() * 5))
      setAppsToday(prev => prev + Math.floor(Math.random() * 3))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="logo" onClick={() => scrollToSection('hero')}>
          AI SWARM
        </div>
        <ul className="nav-links">
          <li><a onClick={() => scrollToSection('hero')}>Home</a></li>
          <li><a onClick={() => scrollToSection('problem')}>Problem</a></li>
          <li><a onClick={() => scrollToSection('solution')}>Solution</a></li>
          <li><a onClick={() => scrollToSection('demo')}>Demo</a></li>
          <li><a onClick={() => scrollToSection('economics')}>Economics</a></li>
          <li><a onClick={() => scrollToSection('cases')}>Cases</a></li>
          <li><a onClick={() => scrollToSection('roadmap')}>Roadmap</a></li>
        </ul>
        <div className="live-stats">
          <div>🟢 {liveUsers.toLocaleString()} online</div>
          <div>⚡ {appsToday} apps today</div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
