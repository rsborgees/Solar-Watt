// Biblioteca de obras — cada item só deve entrar aqui com autorização
// confirmada do cliente para uso de fotos, nome e depoimento (ver seção 11
// do briefing e o princípio "nunca fabricar prova social" do PRODUCT.md).
//
// Formato esperado por obra:
// {
//   id: 'slug-unico',
//   cidade: 'Feira de Santana',
//   uf: 'BA',
//   tipoProjeto: 'Residencial' | 'Comercial' | 'Rural' | 'Industrial',
//   potenciaKwp: 8.4,
//   modulos: 16,
//   data: '2026-03',              // AAAA-MM, data da instalação/homologação
//   fotos: [fotoImportada1],      // import de imagem de src/assets/projects/
//   resultado: 'frase curta e verificável de resultado (opcional)',
//   depoimento: 'texto do depoimento do cliente (opcional)',
//   clienteNome: 'Nome do cliente (opcional, só com autorização)',
// }
export const PROJECTS = []

export const PORTE_TIERS = ['Pequeno', 'Médio', 'Grande']

export function porteDoProjeto(potenciaKwp) {
  if (potenciaKwp <= 5) return 'Pequeno'
  if (potenciaKwp <= 15) return 'Médio'
  return 'Grande'
}
