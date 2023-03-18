import { ParseMailTemplateDTO } from '@/dtos'

export type SendMailDTO = {
  to: string
  subject: string
  template: ParseMailTemplateDTO
}
