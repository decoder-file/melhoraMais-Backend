import { readFile } from 'node:fs/promises'

import { ParseMailTemplateDTO } from '@/dtos'

import handlebars from 'handlebars'

export class HandlebarsMailTemplateProvider {
  public async parse (params: ParseMailTemplateDTO): Promise<string> {
    const { file, variables } = params
    const templateFileContent = await readFile(file, { encoding: 'utf-8' })
    const parseTemplate = handlebars.compile(templateFileContent)
    return parseTemplate(variables)
  }
}
