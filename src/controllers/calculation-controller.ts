import { RequestError } from '@/errors'
import { CalculationRepository } from '@/repositories'
import { CalculationService } from '@/services'

import { Request, Response } from 'express'

export class CalculationController {
  private readonly calculationService: CalculationService

  constructor () {
    this.calculationService = new CalculationService(new CalculationRepository())
  }

  async create (req: Request, res: Response): Promise<any> {
    try {
      await this.calculationService.create(req.body)
      res.sendStatus(200)
    } catch (err) {
      this.handleError(err, res)
    }
  }

  async update (req: Request, res: Response): Promise<any> {
    try {
      await this.calculationService.update(req.params.id, req.body)
      res.sendStatus(200)
    } catch (err) {
      this.handleError(err, res)
    }
  }

  async get (_: Request, res: Response): Promise<any> {
    try {
      const calculations = await this.calculationService.get()
      res.status(200).json(calculations)
    } catch (err) {
      res.sendStatus(500)
    }
  }

  async getById (req: Request, res: Response): Promise<any> {
    try {
      const calculation = await this.calculationService.getById(req.params.id)
      res.status(200).json(calculation)
    } catch (err) {
      this.handleError(err, res)
    }
  }

  async delete (req: Request, res: Response): Promise<any> {
    try {
      await this.calculationService.delete(req.params.id)
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
