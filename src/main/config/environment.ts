import 'dotenv/config'
import { resolve } from 'path'

const nodeEnv = process.env.NODE_ENV

export const dir = process.env.NODE_ENV === 'dev' ? 'src' : 'dist'

export const environment = {
  jwt: {
    secret: process.env.JWT_SECRET ?? 'some-secret',
    refreshSecretToken: process.env.JWT_SECRET_REFRESH_TOKEN ?? 'some-token',
    expiresIn: process.env.JWT_SECRET_EXPIRES_IN ?? '7d',
    refreshTokenExpiresIn: process.env.JWT_SECRET_REFRESH_TOKEN_EXPIRES_IN ?? '7d'
  },
  encrypt: {
    salt: 8
  },
  pg: {
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: 5432,
    user: process.env.POSTGRES_USER ?? 'yan',
    password: process.env.POSTGRES_PASSWORD ?? 'root123',
    database: process.env.POSTGRES_DB ?? 'agro-db'
  },
  mail: {
    local: {
      host: process.env.MAIL_HOST ?? 'some-host',
      type: process.env.MAIL_TYPE ?? 'some-auth',
      port: process.env.MAIL_PORT ?? 25,
      user: process.env.MAIL_USERNAME ?? 'some-user',
      password: process.env.MAIL_PASSWORD ?? 'some-password'
    }
  },
  aws: {
    region: process.env.AWS_REGION ?? 'some-region',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? 'any-access-key=id',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? 'any-secret-access-key',
    emailSource: process.env.AWS_SES_EMAIL_SOURCE
  }
}

export const forgotMailUrl = nodeEnv === 'dev'
  ? 'http://localhost:3000/forgot-password'
  : 'https://agro-api.onrender.com/forgot-password'

export const templatePath = nodeEnv === 'dev'
  ? resolve('src/providers/mail-templates/reset-password.hbs')
  : 'agro_forgot_password'
