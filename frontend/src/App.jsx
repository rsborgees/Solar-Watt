import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import Benefits from './components/Benefits'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <HowItWorks />
        <Benefits />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

export default App
