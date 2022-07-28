import 'dotenv/config'
import { DataSource } from 'typeorm'

const dir = process.env.NODE_ENV === 'dev' ? 'src' : 'dist'

export const mysqlSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  migrations: [`./${dir}/repositories/migrations/*.{js,ts}`],
  entities: [`./${dir}/repositories/entities/*.{js,ts}`],
  synchronize: false
})
