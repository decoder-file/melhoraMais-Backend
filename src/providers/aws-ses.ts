import { SendMailDTO } from '@/dtos'
import { SendMail } from '@/interfaces'
import { environment } from '@/main/config'

import { config, SES } from 'aws-sdk'

type SESResponse = {
  Source: string
  Destination: { ToAddresses: string[] }
  Template: string
  TemplateData: string
}

export class AWSSESCloudProvider implements SendMail {
  constructor () {
    config.update({
      region: environment.aws.region
    })
  }

  public async sendMail (params: SendMailDTO): Promise<void> {
    const mailToSend = await this.buildEmail(params)
    await new SES({ apiVersion: '2010-12-01' }).sendTemplatedEmail(mailToSend).promise()
  }

  private async buildEmail (params: SendMailDTO): Promise<SESResponse> {
    const { to: mailTo, template } = params
    return {
      Source: environment.aws.ses.emailSource!,
      Destination: { ToAddresses: [mailTo] },
      Template: template.file,
      TemplateData: JSON.stringify(template.variables)
    }
  }
}
