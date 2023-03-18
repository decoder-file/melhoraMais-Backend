import { SendMail } from '@/interfaces'

export class SendMailService {
  constructor (private readonly mailProvider: SendMail) {}

  async execute (template: string, data: any, subject: string): Promise<void> {
    await this.mailProvider.sendMail({
      to: data.email,
      subject,
      template: {
        file: template,
        variables: { data }
      }
    })
  }
}
