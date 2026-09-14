// Estimativas aproximadas para a região da Bahia. Servem apenas como ponto de
// partida — o dimensionamento final depende da fatura real, vistoria e projeto elétrico.
const TARIFA_MEDIA_KWH = 0.92 // R$/kWh, referência aproximada
const GERACAO_POR_KWP_MES = 120 // kWh/kWp/mês, considerando irradiação média da BA
const POTENCIA_MODULO_W = 550
const AREA_POR_MODULO_M2 = 2.7
const CUSTO_MIN_POR_KWP = 3700 // R$/kWp
const CUSTO_MAX_POR_KWP = 4700 // R$/kWp
const REDUCAO_ESTIMADA = 0.85 // fração da conta compensável, em média

export function estimateFromMonthlyBill({ valorConta, consumoKwh }) {
  const consumoMensal =
    consumoKwh && consumoKwh > 0 ? consumoKwh : valorConta / TARIFA_MEDIA_KWH

  const potenciaKwp = (consumoMensal * REDUCAO_ESTIMADA) / GERACAO_POR_KWP_MES
  const modulos = Math.max(1, Math.round((potenciaKwp * 1000) / POTENCIA_MODULO_W))
  const areaM2 = Math.round(modulos * AREA_POR_MODULO_M2)
  const geracaoMensalKwh = Math.round(modulos * (POTENCIA_MODULO_W / 1000) * GERACAO_POR_KWP_MES)

  const economiaMensal = Math.min(valorConta * REDUCAO_ESTIMADA, geracaoMensalKwh * TARIFA_MEDIA_KWH)
  const contaResidual = Math.max(0, valorConta - economiaMensal)

  const investimentoMin = Math.round(potenciaKwp * CUSTO_MIN_POR_KWP)
  const investimentoMax = Math.round(potenciaKwp * CUSTO_MAX_POR_KWP)

  const paybackAnosMin = economiaMensal > 0 ? investimentoMin / (economiaMensal * 12) : null
  const paybackAnosMax = economiaMensal > 0 ? investimentoMax / (economiaMensal * 12) : null

  return {
    potenciaKwp: round1(potenciaKwp),
    modulos,
    areaM2,
    geracaoMensalKwh,
    economiaMensal: Math.round(economiaMensal),
    contaResidual: Math.round(contaResidual),
    investimentoMin,
    investimentoMax,
    paybackAnosMin: paybackAnosMin ? round1(paybackAnosMin) : null,
    paybackAnosMax: paybackAnosMax ? round1(paybackAnosMax) : null,
  }
}

function round1(n) {
  return Math.round(n * 10) / 10
}

export function formatBRL(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  })
}
