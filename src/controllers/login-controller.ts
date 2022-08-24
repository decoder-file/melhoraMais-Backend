import { RequestError } from '@/errors'
import { LoginService } from '@/services'

import { Request, Response } from 'express'

export class LoginController {
  constructor (private readonly loginService: LoginService) {}

  async handle (req: Request, res: Response): Promise<void> {
    try {
      const { access_token, refresh_token, user } = await this.loginService.login(req.body)
      res.status(200).json({ access_token, refresh_token, user })
    } catch (err) {
      this.handleError(err, res)
    }
  }

  private handleError (error: unknown, res: Response): void {
    if (error instanceof RequestError) {
      res.status(401).json({ message: error.message })
    } else {
      res.status(500).json({ message: error })
    }
  }
}
