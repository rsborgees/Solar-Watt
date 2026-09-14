import { useDocumentMeta } from '../useDocumentMeta'
import Hero from '../components/Hero'
import Benefits from '../components/Benefits'
import Simulator from '../components/Simulator'
import FinancingTeaser from '../components/FinancingTeaser'
import HowItWorks from '../components/HowItWorks'
import Services from '../components/Services'
import ProjectsTeaser from '../components/ProjectsTeaser'
import About from '../components/About'
import ServiceAreas from '../components/ServiceAreas'
import Contact from '../components/Contact'
import ChapterDivider from '../components/ChapterDivider'

export default function Home() {
  useDocumentMeta({
    title: 'Solar Eleven Watt — Energia solar em Feira de Santana e na Bahia',
    description:
      'Energia solar fotovoltaica residencial, comercial e rural em Feira de Santana e no Recôncavo Baiano. Simule sua economia e conheça o financiamento.',
  })

  return (
    <>
      <Hero />
      <Benefits />

      <ChapterDivider label="Simule e financie" />
      <Simulator />
      <FinancingTeaser />

      <ChapterDivider label="Como funciona" />
      <HowItWorks />
      <Services />

      <ChapterDivider label="Quem somos" />
      <ProjectsTeaser />
      <About />
      <ServiceAreas />

      <ChapterDivider label="Contato" />
      <Contact />
    </>
  )
}
