import { useState } from 'react'
import CustomCursor from './components/CustomCursor'
import TradingBackground from './components/TradingBackground'
import Header from './components/Header'
import Hero from './components/Hero'
import Problems from './components/Problems'
import Solutions from './components/Solutions'
import Process from './components/Process'
import CTA from './components/CTA'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import StickyCTAMobile from './components/StickyCTAMobile'
import LoadingScreen from './components/LoadingScreen'
import Card3DSection from './components/Card3DSection'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <>
      <LoadingScreen onLoadingComplete={() => setIsLoaded(true)} />
      {isLoaded && (
        <div style={{ perspective: '1000px', perspectiveOrigin: 'center top' }}>
          <CustomCursor />
          <TradingBackground />
          <Header />
          <main>
            <Card3DSection index={0}>
              <Hero />
            </Card3DSection>
            <Card3DSection index={1}>
              <Problems />
            </Card3DSection>
            <Card3DSection index={2}>
              <Solutions />
            </Card3DSection>
            <Card3DSection index={3}>
              <Process />
            </Card3DSection>
            <Card3DSection index={4}>
              <CTA />
            </Card3DSection>
            <Card3DSection index={5}>
              <FAQ />
            </Card3DSection>
          </main>
          <Footer />
          <WhatsAppButton />
          <StickyCTAMobile />
        </div>
      )}
    </>
  )
}

export default App
