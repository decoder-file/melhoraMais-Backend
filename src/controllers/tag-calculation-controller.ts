import { NotAuhorizedError, RequestError } from '@/errors'
import { TagCalculationService } from '@/services'

import { Request, Response } from 'express'

export class TagCalculationController {
  constructor (private readonly tagCalculationService: TagCalculationService) {}

  async create (req: Request, res: Response): Promise<void> {
    try {
      await this.tagCalculationService.create(req.body, req.user.id)
      res.sendStatus(200)
    } catch (err) {
      this.handleError(err, res)
    }
  }

  async update (req: Request, res: Response): Promise<void> {
    try {
      await this.tagCalculationService.update(req.params.id, req.body)
      res.sendStatus(200)
    } catch (err) {
      this.handleError(err, res)
    }
  }

  async getByUser (req: Request, res: Response): Promise<void> {
    try {
      const tagCalculations = await this.tagCalculationService.getByUser(req.user.id)
      res.status(200).json(tagCalculations)
    } catch (err) {
      this.handleError(err, res)
    }
  }

  async getById (req: Request, res: Response): Promise<void> {
    try {
      const tagCalculation = await this.tagCalculationService.getById(req.params.id)
      res.status(200).json(tagCalculation)
    } catch (err) {
      this.handleError(err, res)
    }
  }

  async delete (req: Request, res: Response): Promise<void> {
    try {
      await this.tagCalculationService.delete(req.params.id)
      res.sendStatus(200)
    } catch (err) {
      this.handleError(err, res)
    }
  }

  async sync (req: Request, res: Response): Promise<void> {
    try {
      await this.tagCalculationService.sync(req.user.id, req.body)
      res.sendStatus(204)
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
