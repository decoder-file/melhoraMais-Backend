import { SendMailDTO } from '@/dtos'
import { SendMail } from '@/interfaces'
import { environment } from '@/main/config'

import { SendTemplatedEmailCommand, SESClient } from '@aws-sdk/client-ses'

export class AWSSESCloudProvider implements SendMail {
  public async sendMail (params: SendMailDTO): Promise<void> {
    const mailToSend = await this.buildEmail(params)
    await new SESClient({ region: environment.aws.region }).send(mailToSend)
  }

  private async buildEmail (params: SendMailDTO): Promise<SendTemplatedEmailCommand> {
    const { to: mailTo, template } = params
    return new SendTemplatedEmailCommand({
      Source: environment.aws.ses.emailSource!,
      Destination: { ToAddresses: [mailTo] },
      Template: template.file,
      TemplateData: JSON.stringify(template.variables)
    })
  }
}
