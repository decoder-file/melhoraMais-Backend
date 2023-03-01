import { environment, dir } from '../main/config'
import { DataSource } from 'typeorm'

export const dbSource = new DataSource({
  type: 'postgres',
  host: environment.pg.host,
  port: environment.pg.port,
  username: environment.pg.user,
  password: environment.pg.password,
  database: environment.pg.database,
  migrations: [`./${dir}/repositories/migrations/*.{js,ts}`],
  entities: [`./${dir}/repositories/entities/*.{js,ts}`],
  synchronize: false
})
