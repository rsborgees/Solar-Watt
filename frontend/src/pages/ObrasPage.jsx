import { useDocumentMeta } from '../useDocumentMeta'
import PageHero from '../components/PageHero'
import Projects from '../components/Projects'

export default function ObrasPage() {
  useDocumentMeta({
    title: 'Obras de energia solar na Bahia | Solar Eleven Watt',
    description:
      'Conheça projetos reais de energia solar fotovoltaica instalados em cidades da Bahia, filtráveis por tipo de projeto e porte do sistema.',
  })

  return (
    <>
      <PageHero
        eyebrow="Obras"
        title="Projetos reais de energia solar na Bahia"
        description="Cada obra listada aqui só entra no site com autorização do cliente para uso de fotos e depoimento."
      />
      <Projects />
    </>
  )
}
