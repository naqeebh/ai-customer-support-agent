import 'dotenv/config'
import express from 'express'
import { aiRouter } from './routers/aiRouter'

const app = express()
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.use('/ai', aiRouter)

// Global error handler (so the app never crashes from an unhandled error)
app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error('[UNHANDLED ERROR]', err)
    res
      .status(500)
      .json({
        ok: false,
        error: 'Internal server error',
      })
  },
)

const port = Number(process.env.PORT ?? 3000)

if (!process.env.OPENAI_API_KEY) {
  console.error(
    'Missing OPENAI_API_KEY in environment.',
  )
  process.exit(1)
}

app.listen(port, () => {
  console.log(
    `Server running on http://localhost:${port}`,
  )
})
