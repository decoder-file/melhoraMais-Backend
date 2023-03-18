import { SendMailDTO } from '@/dtos'

export interface SendMail {
  sendMail: (params: SendMailDTO) => Promise<void>
}
