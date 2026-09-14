import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { pool } from '../db/pool.js'
import { signToken } from '../auth.js'
import { asyncHandler } from '../asyncHandler.js'

export const authRouter = Router()

authRouter.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) {
    return res.status(400).json({ error: 'Informe e-mail e senha.' })
  }

  const { rows } = await pool.query('SELECT * FROM clients WHERE email = $1', [
    String(email).toLowerCase(),
  ])
  const client = rows[0]
  if (!client) return res.status(401).json({ error: 'E-mail ou senha inválidos.' })

  const ok = await bcrypt.compare(password, client.password_hash)
  if (!ok) return res.status(401).json({ error: 'E-mail ou senha inválidos.' })

  res.json({
    token: signToken(client),
    name: client.name,
    isAdmin: client.is_admin,
  })
}))
