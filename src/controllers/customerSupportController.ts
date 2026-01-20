import {
  Request,
  Response,
  NextFunction,
} from 'express'
import { z } from 'zod'

const bodySchema = z.object({
  prompt: z.string().min(1, 'prompt is required'),
})

export async function customerSupportController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsed = bodySchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({
        ok: false,
        error: 'Invalid request body',
        details: parsed.error.flatten(),
      })
    }

    const { prompt } = parsed.data

    // Placeholder response (next milestone will call the orchestrator agent)
    return res.status(200).json({
      ok: true,
      message:
        'Customer support endpoint is working.',
      echo: prompt,
    })
  } catch (err) {
    next(err)
  }
}
