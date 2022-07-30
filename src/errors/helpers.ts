export class RequestError extends Error {}

export class NotAuhorizedError {
  public readonly message: string
  public readonly statusCode: number

  constructor (message: string, statusCode = 401) {
    this.message = message
    this.statusCode = statusCode
  }
}
