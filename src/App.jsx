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

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <>
      <LoadingScreen onLoadingComplete={() => setIsLoaded(true)} />
      {isLoaded && (
        <>
          <CustomCursor />
          <TradingBackground />
          <Header />
          <main>
            <Hero />
            <Problems />
            <Solutions />
            <Process />
            <CTA />
            <FAQ />
          </main>
          <Footer />
          <WhatsAppButton />
          <StickyCTAMobile />
        </>
      )}
    </>
  )
}

export default App
