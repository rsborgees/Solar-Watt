import { useDocumentMeta } from '../useDocumentMeta'
import PageHero from '../components/PageHero'
import FAQ from '../components/FAQ'

export default function AprendaPage() {
  useDocumentMeta({
    title: 'Aprenda sobre energia solar na Bahia | Solar Eleven Watt',
    description:
      'Tire dúvidas sobre como funciona um sistema fotovoltaico, taxação, financiamento e homologação na Bahia antes de contratar.',
  })

  return (
    <>
      <PageHero
        eyebrow="Aprenda"
        title="Central de dúvidas sobre energia solar"
        description="Conteúdo educativo para quem ainda está pesquisando, antes de falar com a equipe."
      />
      <FAQ />
    </>
  )
}
