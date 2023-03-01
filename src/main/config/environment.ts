import 'dotenv/config'

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
    host: 'localhost',
    port: 5432,
    user: process.env.POSTGRES_USER ?? 'yan',
    password: process.env.POSTGRES_PASSWORD ?? 'root123',
    database: process.env.POSTGRES_DB ?? 'agro-db'
  }
}
