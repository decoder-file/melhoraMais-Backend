import { environment, dir } from '../main/config'
import { DataSource } from 'typeorm'

export const dbSource = new DataSource({
  type: 'postgres',
  migrations: [`./${dir}/repositories/migrations/*.{js,ts}`],
  entities: [`./${dir}/repositories/entities/*.{js,ts}`],
  host: environment.pg.host,
  port: environment.pg.port,
  username: environment.pg.user,
  password: environment.pg.password,
  database: environment.pg.database,
  synchronize: false
})
