import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { pool } from '../db/pool.js'
import { requireAuth, requireAdmin } from '../auth.js'
import { asyncHandler } from '../asyncHandler.js'
import { toProjectDTO } from './me.js'

export const adminRouter = Router()

adminRouter.use(requireAuth, requireAdmin)

// Lista todos os clientes (não-admin) com seus projetos, pro painel admin.
adminRouter.get(
  '/clients',
  asyncHandler(async (_req, res) => {
    const { rows: clients } = await pool.query(
      `SELECT id, name, email, phone, created_at FROM clients WHERE is_admin = FALSE ORDER BY created_at DESC`,
    )
    const { rows: projects } = await pool.query(`SELECT * FROM projects ORDER BY created_at DESC`)

    const projectsByClient = new Map()
    for (const project of projects) {
      const list = projectsByClient.get(project.client_id) || []
      list.push(toProjectDTO(project))
      projectsByClient.set(project.client_id, list)
    }

    res.json(
      clients.map((client) => ({
        id: client.id,
        name: client.name,
        email: client.email,
        phone: client.phone,
        createdAt: client.created_at,
        projects: projectsByClient.get(client.id) || [],
      })),
    )
  }),
)

// Cria um cliente novo com senha inicial e o primeiro projeto dele.
adminRouter.post(
  '/clients',
  asyncHandler(async (req, res) => {
    const { name, email, phone, password, cidade, uf, tipoProjeto, potenciaKwp } = req.body || {}
    if (!name || !email || !password || !cidade || !uf || !tipoProjeto) {
      return res.status(400).json({ error: 'Preencha nome, e-mail, senha, cidade, UF e tipo de projeto.' })
    }

    const client_ = await pool.connect()
    try {
      await client_.query('BEGIN')

      const passwordHash = await bcrypt.hash(password, 10)
      const { rows: clientRows } = await client_.query(
        `INSERT INTO clients (name, email, phone, password_hash, is_admin)
         VALUES ($1, $2, $3, $4, FALSE) RETURNING id`,
        [name, String(email).toLowerCase(), phone || null, passwordHash],
      )
      const clientId = clientRows[0].id

      const { rows: projectRows } = await client_.query(
        `INSERT INTO projects (client_id, cidade, uf, tipo_projeto, potencia_kwp)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [clientId, cidade, uf, tipoProjeto, potenciaKwp || null],
      )

      await client_.query('COMMIT')
      res.status(201).json({ clientId, project: toProjectDTO(projectRows[0]) })
    } catch (err) {
      await client_.query('ROLLBACK')
      if (err.code === '23505') {
        return res.status(409).json({ error: 'Já existe um cliente com esse e-mail.' })
      }
      throw err
    } finally {
      client_.release()
    }
  }),
)

// Atualiza a etapa (1-9) do cronograma de um projeto.
adminRouter.patch(
  '/projects/:id',
  asyncHandler(async (req, res) => {
    const { currentStep } = req.body || {}
    const step = Number(currentStep)
    if (!Number.isInteger(step) || step < 1 || step > 9) {
      return res.status(400).json({ error: 'currentStep precisa ser um número entre 1 e 9.' })
    }

    const { rows } = await pool.query(
      `UPDATE projects SET current_step = $1, updated_at = now() WHERE id = $2 RETURNING *`,
      [step, req.params.id],
    )
    if (!rows[0]) return res.status(404).json({ error: 'Projeto não encontrado.' })
    res.json(toProjectDTO(rows[0]))
  }),
)
