import { SendMailDTO } from '@/dtos'
import { HandlebarsMailTemplateProvider } from '@/providers/handlebars-template-provider'
import { SendMail } from '@/interfaces'
import { environment } from '@/main/config'

import mailer, { Transporter } from 'nodemailer'

export class NodemailerProvider implements SendMail {
  private readonly client: Transporter

  constructor (private readonly templateProvider: HandlebarsMailTemplateProvider) {
    const transporter = mailer.createTransport({
      host: environment.mail.local.host,
      port: Number(environment.mail.local.port),
      auth: {
        user: environment.mail.local.user,
        pass: environment.mail.local.password
      }
    })
    this.client = transporter
  }

  public async sendMail (params: SendMailDTO): Promise<void> {
    const { subject, template, to: mailTo } = params
    try {
      await this.client.sendMail({
        ...params,
        from: environment.aws.emailSource,
        to: mailTo,
        subject,
        html: await this.templateProvider.parse(template)
      })
    } catch (e) {
      console.log('error on send email', e)
    }
  }
}
