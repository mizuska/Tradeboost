import CustomCursor from './components/CustomCursor'
import TradingBackground from './components/TradingBackground'
import Header from './components/Header'
import Hero from './components/Hero'
import Problems from './components/Problems'
import Solutions from './components/Solutions'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <CustomCursor />
      <TradingBackground />
      <Header />
      <main>
        <Hero />
        <Problems />
        <Solutions />
        <Process />
        <Testimonials />
        <CTA />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}

export default App
