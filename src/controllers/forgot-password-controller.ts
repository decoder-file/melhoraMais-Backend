import { RequestError } from '@/errors'
import { ForgotPasswordService } from '@/services'

import { Request, Response } from 'express'

export class ForgotPasswordController {
  constructor (private readonly forgotPasswordService: ForgotPasswordService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      await this.forgotPasswordService.execute(req.body.email)
      res.sendStatus(200)
    } catch (err) {
      this.handleError(err, res)
    }
  }

  private handleError (error: unknown, res: Response): void {
    if (error instanceof RequestError) {
      res.status(422).json({ message: error.message })
    } else {
      res.status(500).json({ message: error })
    }
  }
}
