import { Router } from 'express'
import { pool } from '../db/pool.js'
import { requireAuth } from '../auth.js'
import { asyncHandler } from '../asyncHandler.js'

export const meRouter = Router()

meRouter.use(requireAuth)

meRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const { rows } = await pool.query(
      'SELECT id, name, email, phone, is_admin FROM clients WHERE id = $1',
      [req.auth.sub],
    )
    const client = rows[0]
    if (!client) return res.status(404).json({ error: 'Cliente não encontrado.' })
    res.json({
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      isAdmin: client.is_admin,
    })
  }),
)

meRouter.get(
  '/projects',
  asyncHandler(async (req, res) => {
    const { rows } = await pool.query(
      `SELECT id, cidade, uf, tipo_projeto, potencia_kwp, current_step, updated_at, created_at
       FROM projects WHERE client_id = $1 ORDER BY created_at DESC`,
      [req.auth.sub],
    )
    res.json(rows.map(toProjectDTO))
  }),
)

export function toProjectDTO(row) {
  return {
    id: row.id,
    cidade: row.cidade,
    uf: row.uf,
    tipoProjeto: row.tipo_projeto,
    potenciaKwp: row.potencia_kwp ? Number(row.potencia_kwp) : null,
    currentStep: row.current_step,
    updatedAt: row.updated_at,
    createdAt: row.created_at,
  }
}
