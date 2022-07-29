import { NotAuhorizedError } from '@/errors'
import { env } from '@/main/config/env'

import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

type IPayload = { sub: string }

export async function ensureAuthenticate (request: Request, _: Response, next: NextFunction) {
  const authHeader = request.headers.authorization
  if (!authHeader) throw new NotAuhorizedError('Token is missing.')
  const [, token] = authHeader.split(' ')
  try {
    const { sub: user_id } = verify(token, env.jwt.secret) as IPayload
    request.user = { id: user_id }
    next()
  } catch {
    throw new NotAuhorizedError('Invalid token.')
  }
}