import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff } from 'lucide-react'

const DemoSection = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [vibeInput, setVibeInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState(null)
  const [speechSupported, setSpeechSupported] = useState(false)

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setSpeechSupported(true)
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = false
      recognitionInstance.interimResults = true
      recognitionInstance.lang = 'en-US'

      recognitionInstance.onstart = () => {
        console.log('Speech recognition started')
        setIsListening(true)
      }
      
      recognitionInstance.onend = () => {
        console.log('Speech recognition ended')
        setIsListening(false)
      }
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }
      
      recognitionInstance.onresult = (event) => {
        let transcript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript
          }
        }
        if (transcript) {
          setVibeInput(transcript)
        }
      }

      setRecognition(recognitionInstance)
    } else {
      setSpeechSupported(false)
      console.log('Speech recognition not supported')
    }
  }, [])

  const examples = [
    "Build an app that feels like finding a $20 bill in an old jacket",
    "Create something for people who just moved to a new city and feel lonely",
    "I want an app that feels like a warm hug for people searching for jobs"
  ]

  const setExample = (example) => {
    setVibeInput(example)
  }

  const processVibe = () => {
    if (!vibeInput.trim()) {
      alert('Please enter a vibe description first!')
      return
    }
    setCurrentStep(2)
    setTimeout(() => setCurrentStep(3), 3000)
    setTimeout(() => setCurrentStep(4), 6000)
    setTimeout(() => setCurrentStep(5), 9000)
  }

  const toggleVoice = () => {
    if (!speechSupported) {
      alert('Speech recognition is not supported in your browser. Please try Chrome or Edge.')
      return
    }

    if (!recognition) {
      alert('Speech recognition is not available.')
      return
    }

    try {
      if (isListening) {
        recognition.stop()
      } else {
        recognition.start()
      }
    } catch (error) {
      console.error('Error toggling speech recognition:', error)
      alert('Error with speech recognition. Please try again.')
    }
  }

  const restartDemo = () => {
    setCurrentStep(1)
    setVibeInput('')
  }

  return (
    <section id="demo" className="section">
      <div className="container">
        <motion.div 
          className="fade-in"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2><span className="highlight">Experience</span> Vibe Coding</h2>
          <p style={{ textAlign: 'center', fontSize: '1.3rem', marginBottom: '3rem', opacity: 0.9 }}>
            Describe your app using feelings, not features. Our AI swarm transforms emotions into functional applications.
          </p>
          
          <div className="card" style={{ background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(20px)', borderRadius: '25px', padding: '3rem', marginTop: '3rem', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3>🎭 Step 1: Share Your Vibe</h3>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', margin: '2rem 0' }}>
                    <input 
                      type="text" 
                      value={vibeInput}
                      onChange={(e) => setVibeInput(e.target.value)}
                      placeholder="I want an app that feels like..."
                      style={{
                        width: '100%',
                        padding: '1.5rem',
                        border: 'none',
                        borderRadius: '15px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        fontSize: '1.2rem',
                        backdropFilter: 'blur(10px)',
                        border: '2px solid transparent',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#a855f7'}
                      onBlur={(e) => e.target.style.borderColor = 'transparent'}
                    />
                    <motion.button 
                      onClick={toggleVoice}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        background: isListening ? 'linear-gradient(45deg, #ef4444, #f97316)' : 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                        border: 'none',
                        padding: '1rem',
                        borderRadius: '50%',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '60px',
                        minHeight: '60px',
                        opacity: speechSupported ? 1 : 0.5
                      }}
                      title={speechSupported ? (isListening ? 'Stop recording' : 'Start voice input') : 'Speech recognition not supported'}
                    >
                      {isListening ? <MicOff size={24} /> : <Mic size={24} />}
                    </motion.button>
                  </div>
                  {!speechSupported && (
                    <p style={{ color: '#f59e0b', fontSize: '0.9rem', textAlign: 'center', marginBottom: '1rem' }}>
                      💡 Voice input works best in Chrome or Edge browsers
                    </p>
                  )}
                  <motion.button 
                    onClick={processVibe}
                    className="cta-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Process with AI Swarm
                  </motion.button>
                  
                  <div style={{ marginTop: '2rem' }}>
                    <h4 style={{ color: '#a855f7', marginBottom: '1rem' }}>💡 Try These Examples:</h4>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                      {examples.map((example, index) => (
                        <motion.div 
                          key={index}
                          className="card micro-interaction" 
                          onClick={() => setExample(example)}
                          whileHover={{ scale: 1.02, backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
                          style={{ cursor: 'pointer', padding: '1rem' }}
                        >
                          "{example}"
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3>🤖 Step 2: AI Swarm Processing</h3>
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <motion.div 
                      style={{ fontSize: '3rem', marginBottom: '1rem' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      🧠
                    </motion.div>
                    <h4>AI Agents Analyzing Your Vibe...</h4>
                    <div style={{ margin: '2rem 0' }}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        🧠 Analyzing emotional resonance...
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                      >
                        🎯 Identifying core user needs...
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                      >
                        💡 Generating app concept...
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3>👥 Step 3: Community Validation</h3>
                  <h4 style={{ marginBottom: '1rem' }}>Community Validation Results:</h4>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <motion.div 
                      className="card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong>ValidatorEagle</strong>
                          <p style={{ margin: '0.5rem 0' }}>🔥 Aligns Well - Great emotional resonance!</p>
                        </div>
                        <div style={{ background: '#10b981', padding: '0.5rem 1rem', borderRadius: '20px', color: 'white', fontSize: '0.9rem' }}>
                          +5 Rep
                        </div>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong>SwarmWise</strong>
                          <p style={{ margin: '0.5rem 0' }}>💡 Helpful - Consider adding social features</p>
                        </div>
                        <div style={{ background: '#10b981', padding: '0.5rem 1rem', borderRadius: '20px', color: 'white', fontSize: '0.9rem' }}>
                          +5 Rep
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3>⚡ Step 4: Live Code Generation</h3>
                  <div style={{ background: '#1a1b3e', borderRadius: '15px', padding: '2rem', marginTop: '2rem', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></div>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308' }}></div>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }}></div>
                    </div>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.6, color: '#e2e8f0' }}>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        import React from 'react';
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        export default function WarmHugJobApp() {'{'}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        &nbsp;&nbsp;return (<div>Your Journey to Opportunity</div>);
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        {'}'}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3>📱 Step 5: Live App Preview</h3>
                  <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '10px', padding: '2rem', textAlign: 'center', color: 'white', marginTop: '2rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❤️</div>
                    <h3>Your Journey to Opportunity</h3>
                    <div style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '1rem', borderRadius: '8px', margin: '1rem 0' }}>
                      <p style={{ fontStyle: 'italic' }}>"You are worthy of great opportunities! 🌟"</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                      <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1rem', borderRadius: '8px' }}>
                        <div style={{ fontSize: '2rem' }}>👔</div>
                        <div>Job Matches</div>
                      </div>
                      <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1rem', borderRadius: '8px' }}>
                        <div style={{ fontSize: '2rem' }}>💬</div>
                        <div>Community</div>
                      </div>
                      <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1rem', borderRadius: '8px' }}>
                        <div style={{ fontSize: '2rem' }}>📈</div>
                        <div>Progress</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <motion.button 
                      className="cta-button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ marginRight: '1rem' }}
                    >
                      🚀 Deploy to Bolt.new
                    </motion.button>
                    <motion.button 
                      className="cta-button secondary"
                      onClick={restartDemo}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      🔄 Try Another Idea
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default DemoSection