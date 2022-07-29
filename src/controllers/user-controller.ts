import { NotAuhorizedError, RequestError } from '@/errors'
import { UserRepository } from '@/repositories'
import { UserService } from '@/services'

import { Request, Response } from 'express'

export class UserController {
  private readonly userService: UserService

  constructor () {
    this.userService = new UserService(new UserRepository())
  }

  async create (req: Request, res: Response): Promise<any> {
    try {
      await this.userService.create(req.body)
      res.sendStatus(200)
    } catch (err) {
      this.handleError(err, res)
    }
  }

  async update (req: Request, res: Response): Promise<any> {
    try {
      await this.userService.update(req.params.id, req.body)
      res.sendStatus(200)
    } catch (err) {
      this.handleError(err, res)
    }
  }

  async getById (req: Request, res: Response): Promise<any> {
    try {
      const user = await this.userService.getById(req.params.id)
      res.status(200).json(user)
    } catch (err) {
      this.handleError(err, res)
    }
  }

  async delete (req: Request, res: Response): Promise<any> {
    try {
      await this.userService.delete(req.params.id)
      res.sendStatus(200)
    } catch (err) {
      this.handleError(err, res)
    }
  }

  async get (_: Request, res: Response): Promise<any> {
    try {
      const users = await this.userService.get()
      res.status(200).json(users)
    } catch (err) {
      this.handleError(err, res)
    }
  }

  private handleError (error: unknown, res: Response): void {
    if (error instanceof RequestError) {
      res.status(422).json({ message: error.message })
    } else if (error instanceof NotAuhorizedError) {
      res.status(401).json({ message: error.message })
    } else {
      res.status(500).json({ message: error })
    }
  }
}
