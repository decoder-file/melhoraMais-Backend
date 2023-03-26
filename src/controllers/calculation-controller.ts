import { NotAuhorizedError, RequestError } from '@/errors'
import { CalculationService } from '@/services'

import { Request, Response } from 'express'

export class CalculationController {
  constructor (private readonly calculationService: CalculationService) {}

  async create (req: Request, res: Response): Promise<void> {
    try {
      await this.calculationService.create(req.body, req.user.id)
      res.sendStatus(200)
    } catch (err) {
      this.handleError(err, res)
    }
  }

  async update (req: Request, res: Response): Promise<void> {
    try {
      await this.calculationService.update(req.params.id, req.body)
      res.sendStatus(200)
    } catch (err) {
      this.handleError(err, res)
    }
  }

  async getByUser (req: Request, res: Response): Promise<void> {
    try {
      const calculations = await this.calculationService.getByUser(req.user.id)
      res.status(200).json(calculations)
    } catch (err) {
      this.handleError(err, res)
    }
  }

  async getById (req: Request, res: Response): Promise<void> {
    try {
      const calculation = await this.calculationService.getById(req.params.id)
      res.status(200).json(calculation)
    } catch (err) {
      this.handleError(err, res)
    }
  }

  async delete (req: Request, res: Response): Promise<void> {
    try {
      await this.calculationService.delete(req.params.id)
      res.sendStatus(200)
    } catch (err) {
      this.handleError(err, res)
    }
  }

  async sync (req: Request, res: Response): Promise<void> {
    try {
      await this.calculationService.sync(req.user.id, req.body)
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
