import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { pool } from './pool.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const schema = readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8')

async function main() {
  await pool.query(schema)
  console.log('Migração aplicada com sucesso.')
  await pool.end()
}

main().catch((err) => {
  console.error('Falha ao migrar:', err)
  process.exit(1)
})
