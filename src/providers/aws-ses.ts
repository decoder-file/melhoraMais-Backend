import { SendMailDTO } from '@/dtos'
import { SendMail } from '@/interfaces'
import { environment } from '@/main/config'

import { SESClient, SendTemplatedEmailCommand } from '@aws-sdk/client-ses'

export class AWSSESCloudProvider implements SendMail {
  private readonly client: SESClient

  constructor () {
    this.client = new SESClient({
      region: environment.aws.region
    })
  }

  public async sendMail (params: SendMailDTO): Promise<void> {
    try {
      const mailToSend = await this.buildEmail(params)
      await this.client.send(mailToSend)
    } catch (err) {
      console.log('ERRO AWS', err)
    }
  }

  private async buildEmail (params: SendMailDTO): Promise<SendTemplatedEmailCommand> {
    const { to: mailTo, template } = params

    return new SendTemplatedEmailCommand({
      Destination: { ToAddresses: [mailTo] },
      TemplateData: JSON.stringify(template.variables),
      Source: environment.aws.emailSource,
      Template: template.file
    })
  }
}
