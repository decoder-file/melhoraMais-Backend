import { NotAuhorizedError, RequestError } from '@/errors'
import { TagCalculationRepository } from '@/repositories'
import { TagCalculationService } from '@/services'

import { Request, Response } from 'express'

export class TagCalculationController {
  private readonly tagCalculationService: TagCalculationService

  constructor () {
    this.tagCalculationService = new TagCalculationService(new TagCalculationRepository())
  }

  async create (req: Request, res: Response): Promise<any> {
    try {
      await this.tagCalculationService.create(req.body)
      res.sendStatus(200)
    } catch (err) {
      this.handleError(err, res)
    }
  }

  async update (req: Request, res: Response): Promise<any> {
    try {
      await this.tagCalculationService.update(req.params.id, req.body)
      res.sendStatus(200)
    } catch (err) {
      this.handleError(err, res)
    }
  }

  async get (_: Request, res: Response): Promise<any> {
    try {
      const tagCalculations = await this.tagCalculationService.get()
      res.status(200).json(tagCalculations)
    } catch (err) {
      this.handleError(err, res)
    }
  }

  async getById (req: Request, res: Response): Promise<any> {
    try {
      const tagCalculation = await this.tagCalculationService.getById(req.params.id)
      res.status(200).json(tagCalculation)
    } catch (err) {
      this.handleError(err, res)
    }
  }

  async delete (req: Request, res: Response): Promise<any> {
    try {
      await this.tagCalculationService.delete(req.params.id)
      res.sendStatus(200)
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
