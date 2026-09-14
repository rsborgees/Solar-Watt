import bcrypt from 'bcryptjs'
import { pool } from './pool.js'

async function main() {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env
  if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error('Defina ADMIN_NAME, ADMIN_EMAIL e ADMIN_PASSWORD no .env antes de rodar o seed.')
  }

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10)

  await pool.query(
    `INSERT INTO clients (name, email, password_hash, is_admin)
     VALUES ($1, $2, $3, TRUE)
     ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, is_admin = TRUE`,
    [ADMIN_NAME, ADMIN_EMAIL.toLowerCase(), passwordHash],
  )

  console.log(`Admin "${ADMIN_EMAIL}" criado/atualizado com sucesso.`)
  await pool.end()
}

main().catch((err) => {
  console.error('Falha ao criar admin:', err)
  process.exit(1)
})
