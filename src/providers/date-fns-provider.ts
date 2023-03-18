import { isBefore, addHours } from 'date-fns'

export class DateFNSProvider {
  compareIfBefore (initialDate: Date, endDate: Date): boolean {
    return isBefore(initialDate, endDate)
  }

  addHours (hours: number): Date {
    return addHours(new Date(), hours)
  }
}
