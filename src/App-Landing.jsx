import React from 'react'
import { motion } from 'framer-motion'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import ProblemSection from './components/ProblemSection'
import SolutionSection from './components/SolutionSection'
import DemoSection from './components/DemoSection'
import EconomicsSection from './components/EconomicsSection'
import CaseStudiesSection from './components/CaseStudiesSection'
import LeaderboardSection from './components/LeaderboardSection'
import RoadmapSection from './components/RoadmapSection'
import Footer from './components/Footer'
import BackgroundElements from './components/BackgroundElements'
import LiveActivity from './components/LiveActivity'
import CryptoTicker from './components/CryptoTicker'

function AppLanding() {
  return (
    <div className="App">
      <BackgroundElements />
      <Navigation />
      <LiveActivity />
      
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <DemoSection />
        <EconomicsSection />
        <CaseStudiesSection />
        <LeaderboardSection />
        <RoadmapSection />
      </main>
      
      <Footer />
      <CryptoTicker />
    </div>
  )
}

export default AppLanding