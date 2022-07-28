export class RequiredFieldError {
  public readonly errors: string[]

  constructor (errors: string[]) {
    this.errors = errors
  }
}

export class RequestError extends Error {}
