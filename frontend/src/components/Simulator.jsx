import { useRef, useState } from 'react'
import { useInView } from '../useInView'
import { whatsappLink } from '../whatsapp'
import { estimateFromMonthlyBill, formatBRL } from '../simulate'
import { trackEvent } from '../analytics'
import { submitLead } from '../leads'
import MunicipioSelect from './MunicipioSelect'

const TIPO_PROJETO = ['Residencial', 'Comercial', 'Rural', 'Industrial']
const INTENCAO = [
  { value: 'comprar', label: 'Quero comprar' },
  { value: 'financiar', label: 'Quero financiar' },
  { value: 'pesquisando', label: 'Ainda estou pesquisando' },
]

const ESTADOS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
  'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
]

const initialForm = {
  tipoProjeto: TIPO_PROJETO[0],
  municipio: '',
  uf: 'BA',
  valorConta: '',
  consumoKwh: '',
  intencao: 'pesquisando',
  nome: '',
}

export default function Simulator() {
  const [ref, inView] = useInView(0.1)
  const cls = inView ? 'in-view' : ''

  const [form, setForm] = useState(initialForm)
  const [result, setResult] = useState(null)
  const startedRef = useRef(false)

  const handleChange = (field) => (e) => {
    if (!startedRef.current) {
      startedRef.current = true
      trackEvent('simulator_start')
    }
    setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  const handleUfChange = (e) => {
    if (!startedRef.current) {
      startedRef.current = true
      trackEvent('simulator_start')
    }
    const uf = e.target.value
    setForm((f) => ({ ...f, uf, municipio: '' }))
  }

  const handleMunicipioChange = (nome) => {
    if (!startedRef.current) {
      startedRef.current = true
      trackEvent('simulator_start')
    }
    setForm((f) => ({ ...f, municipio: nome }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const valorConta = Number(form.valorConta)
    if (!valorConta || valorConta <= 0) return

    const consumoKwh = Number(form.consumoKwh) || 0
    const estimate = estimateFromMonthlyBill({ valorConta, consumoKwh })
    setResult(estimate)
    trackEvent('simulator_complete', {
      tipoProjeto: form.tipoProjeto,
      intencao: form.intencao,
      uf: form.uf,
    })

    submitLead({
      subject: `Novo lead do simulador — ${form.nome || form.municipio || form.uf}`,
      Nome: form.nome || 'Não informado',
      'Tipo de projeto': form.tipoProjeto,
      Cidade: form.municipio ? `${form.municipio} - ${form.uf}` : form.uf,
      'Conta média informada': formatBRL(valorConta),
      'Consumo informado': consumoKwh ? `${consumoKwh} kWh` : 'Não informado',
      Interesse: INTENCAO.find((i) => i.value === form.intencao)?.label ?? form.intencao,
      'Potência estimada': `${estimate.potenciaKwp} kWp`,
      'Economia mensal estimada': formatBRL(estimate.economiaMensal),
      'Faixa de investimento estimada': `${formatBRL(estimate.investimentoMin)} – ${formatBRL(estimate.investimentoMax)}`,
    })
  }

  const isBahia = form.uf === 'BA'

  const regionalNote = isBahia
    ? 'Endereço na Bahia: a análise vai considerar a distribuidora responsável pelo seu município — na maior parte do estado, a Neoenergia Coelba — e pode variar conforme a região.'
    : `Endereço fora da Bahia (${form.uf}): a análise vai seguir as regras da distribuidora responsável pelo seu endereço, que pode ter prazos, canais e procedimentos de homologação diferentes dos exemplos mostrados neste site para a Bahia.`

  const whatsappMessage = result
    ? `Olá! Fiz uma simulação no site e gostaria de uma orientação personalizada.\n\n` +
      `Tipo de projeto: ${form.tipoProjeto}\n` +
      `Município: ${form.municipio || 'não informado'} - ${form.uf}\n` +
      `Conta média: ${formatBRL(Number(form.valorConta))}\n` +
      `Interesse: ${INTENCAO.find((i) => i.value === form.intencao)?.label}\n` +
      `Estimativa do site: ~${result.potenciaKwp} kWp, economia de ~${formatBRL(result.economiaMensal)}/mês` +
      (form.nome ? `\nNome: ${form.nome}` : '')
    : ''

  return (
    <section id="simular" className="section">
      <div ref={ref}>
        <div className={`reveal ${cls}`}>
          <span className="section-label">Simule sua economia</span>
          <h2>Quanto você pode economizar?</h2>
          <p className="simulator-desc">
            Preencha os dados abaixo para uma estimativa inicial. O
            dimensionamento final depende da sua fatura, vistoria técnica e
            das regras da distribuidora responsável pelo seu endereço.
          </p>
        </div>

        <div className={`simulator-grid reveal reveal-2 ${cls}`}>
          <form className="simulator-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="tipoProjeto">Tipo de projeto</label>
              <select
                id="tipoProjeto"
                value={form.tipoProjeto}
                onChange={handleChange('tipoProjeto')}
              >
                {TIPO_PROJETO.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-field form-field-uf">
                <label htmlFor="uf">Estado</label>
                <select id="uf" value={form.uf} onChange={handleUfChange}>
                  {ESTADOS.map((uf) => (
                    <option key={uf} value={uf}>
                      {uf}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="municipio">Município</label>
                <MunicipioSelect
                  id="municipio"
                  uf={form.uf}
                  value={form.municipio}
                  onChange={handleMunicipioChange}
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="valorConta">Valor médio da conta de luz (R$)</label>
              <input
                id="valorConta"
                type="number"
                min="1"
                step="1"
                required
                placeholder="Ex.: 450"
                value={form.valorConta}
                onChange={handleChange('valorConta')}
              />
            </div>

            <div className="form-field">
              <label htmlFor="consumoKwh">Consumo em kWh (opcional)</label>
              <input
                id="consumoKwh"
                type="number"
                min="0"
                step="1"
                placeholder="Se souber, informe da fatura"
                value={form.consumoKwh}
                onChange={handleChange('consumoKwh')}
              />
            </div>

            <div className="form-field">
              <label htmlFor="intencao">Você está</label>
              <select
                id="intencao"
                value={form.intencao}
                onChange={handleChange('intencao')}
              >
                {INTENCAO.map((i) => (
                  <option key={i.value} value={i.value}>
                    {i.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="nome">Nome (opcional)</label>
              <input
                id="nome"
                type="text"
                placeholder="Para recebermos sua estimativa"
                value={form.nome}
                onChange={handleChange('nome')}
              />
            </div>

            <p className="simulator-consent">
              Ao calcular, você concorda em ser contatado pela nossa equipe
              sobre essa simulação. Não pedimos CPF, renda ou dados
              bancários neste formulário.
            </p>

            <button type="submit" className="btn btn-primary">
              Calcular minha economia
            </button>
          </form>

          <div className="simulator-result">
            {!result ? (
              <div className="simulator-placeholder">
                <p>
                  Preencha o formulário para ver a estimativa de potência,
                  economia mensal e investimento aproximado do seu sistema.
                </p>
              </div>
            ) : (
              <div className="result-card">
                <span className="stat-card-badge">Estimativa inicial</span>
                <div className="result-grid">
                  <div className="result-item">
                    <span className="result-value">{result.potenciaKwp} kWp</span>
                    <span className="result-label">Potência estimada</span>
                  </div>
                  <div className="result-item">
                    <span className="result-value">{result.modulos}</span>
                    <span className="result-label">Módulos (aprox.)</span>
                  </div>
                  <div className="result-item">
                    <span className="result-value">{result.areaM2} m²</span>
                    <span className="result-label">Área necessária</span>
                  </div>
                  <div className="result-item">
                    <span className="result-value">
                      {formatBRL(result.economiaMensal)}
                    </span>
                    <span className="result-label">Economia mensal estimada</span>
                  </div>
                  <div className="result-item">
                    <span className="result-value">
                      {formatBRL(result.investimentoMin)} –{' '}
                      {formatBRL(result.investimentoMax)}
                    </span>
                    <span className="result-label">Faixa de investimento</span>
                  </div>
                  <div className="result-item">
                    <span className="result-value">
                      {result.paybackAnosMin && result.paybackAnosMax
                        ? `${result.paybackAnosMin} – ${result.paybackAnosMax} anos`
                        : '—'}
                    </span>
                    <span className="result-label">Retorno estimado</span>
                  </div>
                </div>
                <p className="result-disclaimer">
                  Estimativa inicial e orientativa. O valor final depende da
                  análise da sua fatura, do tipo de unidade consumidora, da
                  vistoria técnica e das regras da distribuidora responsável
                  pelo seu endereço.
                </p>
                <p className={`result-regional ${isBahia ? '' : 'result-regional-outside'}`}>
                  {regionalNote}
                </p>
                <a
                  className="btn btn-primary"
                  href={whatsappLink(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { location: 'simulator_result' })}
                >
                  Receber orientação pelo WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
