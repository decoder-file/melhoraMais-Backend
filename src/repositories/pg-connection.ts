import { environment, dir } from '../main/config'
import { DataSource } from 'typeorm'

export const dbSource = new DataSource({
  type: 'postgres',
  migrations: [`./${dir}/repositories/migrations/*.{js,ts}`],
  entities: [`./${dir}/repositories/entities/*.{js,ts}`],
  url: environment.pg.url,
  synchronize: false
})
