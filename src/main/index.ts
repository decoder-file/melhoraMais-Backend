import 'reflect-metadata'
import './config/module-alias'

import { app } from '@/main/config/routes'
import { dbSource } from '@/repositories/pg-connection'

dbSource.initialize()
  .then(() => app.listen(3000, () => console.log('Server running!')))
  .catch(console.error)
