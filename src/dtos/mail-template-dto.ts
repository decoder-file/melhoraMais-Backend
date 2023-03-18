export type TemplateMailVariables = {
  [key: string]: string
}

export type ParseMailTemplateDTO = {
  file: string
  variables: TemplateMailVariables
}
