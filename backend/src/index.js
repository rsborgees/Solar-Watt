import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { authRouter } from './routes/auth.js'
import { meRouter } from './routes/me.js'
import { adminRouter } from './routes/admin.js'

const app = express()

app.use(cors({ origin: process.env.ALLOWED_ORIGIN?.split(',') || '*' }))
app.use(express.json())

app.get('/api/health', (_req, res) => res.json({ ok: true }))
app.use('/api/auth', authRouter)
app.use('/api/me', meRouter)
app.use('/api/admin', adminRouter)

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Erro interno.' })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`)
})
