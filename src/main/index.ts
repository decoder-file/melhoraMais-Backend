import 'reflect-metadata'
import './config/module-alias'

import { app } from '@/main/config/routes'
import { mysqlSource } from '@/repositories/mysql-connection'

mysqlSource.initialize()
  .then(() => app.listen(3333, () => console.log('Server running!')))
  .catch(console.error)
