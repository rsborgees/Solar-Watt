import { useDocumentMeta } from '../useDocumentMeta'
import PageHero from '../components/PageHero'
import Financing from '../components/Financing'

export default function FinanciamentoPage() {
  useDocumentMeta({
    title: 'Financiamento de energia solar na Bahia — FNE Sol | Solar Eleven Watt',
    description:
      'Entenda o FNE Sol do Banco do Nordeste e outras alternativas de mercado para financiar seu sistema de energia solar fotovoltaica na Bahia.',
  })

  return (
    <>
      <PageHero
        eyebrow="Financiamento"
        title="Como financiar o seu sistema de energia solar"
        description="O Banco do Nordeste tem destaque regional com o FNE Sol. Veja também outras alternativas de mercado — sempre com a ressalva de que parceria comercial não está confirmada onde não houver documentação."
      />
      <Financing />
    </>
  )
}
