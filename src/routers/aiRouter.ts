import { Router } from 'express'
import { customerSupportController } from '../controllers/customerSupportController'

export const aiRouter = Router()

aiRouter.post(
  '/customer-support',
  customerSupportController,
)

