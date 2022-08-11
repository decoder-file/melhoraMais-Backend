import { environment, dir } from '../main/config'
import { DataSource } from 'typeorm'

export const mysqlSource = new DataSource({
  type: 'mysql',
  host: environment.mysql.host,
  port: environment.mysql.port,
  username: environment.mysql.user,
  password: environment.mysql.password,
  database: environment.mysql.database,
  migrations: [`./${dir}/repositories/migrations/*.{js,ts}`],
  entities: [`./${dir}/repositories/entities/*.{js,ts}`],
  synchronize: false
})
