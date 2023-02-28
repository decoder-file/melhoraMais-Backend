import { resolve } from 'node:path'
import express, { Router, json } from 'express'
import cors from 'cors'
import YAML from 'yamljs'
import { serve, setup } from 'swagger-ui-express'

import { TagCalculationControllerFactory, UserControllerFactory, LoginControllerFactory, CalculationControllerFactory } from '@/main/factories/controllers'
import { ensureAuthenticated } from '@/middlewares'

export const app = express()
const router = Router()
const calculationController = CalculationControllerFactory()
const loginController = LoginControllerFactory()
const tagCalculationController = TagCalculationControllerFactory()
const userController = UserControllerFactory()
const swaggerDocument = YAML.load(resolve(__dirname, '../../../api-spec.yaml'))

app.use(cors())
app.use(json())

router.post('/users', async (req, res) => userController.create(req, res))
router.post('/login', async (req, res) => loginController.handle(req, res))

app.use('/docs', serve, setup(swaggerDocument))

router.get('/users', ensureAuthenticated, async (req, res) => userController.get(req, res))
router.get('/users/:id', ensureAuthenticated, async (req, res) => userController.getById(req, res))
router.delete('/users/:id', ensureAuthenticated, async (req, res) => userController.delete(req, res))
router.patch('/users/:id', ensureAuthenticated, async (req, res) => userController.update(req, res))

router.post('/calculations', ensureAuthenticated, async (req, res) => calculationController.create(req, res))
router.get('/calculations', ensureAuthenticated, async (req, res) => calculationController.get(req, res))
router.get('/calculations/:id', ensureAuthenticated, async (req, res) => calculationController.getById(req, res))
router.delete('/calculations/:id', ensureAuthenticated, async (req, res) => calculationController.delete(req, res))
router.patch('/calculations/:id', ensureAuthenticated, async (req, res) => calculationController.update(req, res))

router.post('/tag-calculations', ensureAuthenticated, async (req, res) => tagCalculationController.create(req, res))
router.get('/tag-calculations/:id', ensureAuthenticated, async (req, res) => tagCalculationController.getById(req, res))
router.get('/tag-calculations', ensureAuthenticated, async (req, res) => tagCalculationController.get(req, res))
router.delete('/tag-calculations/:id', ensureAuthenticated, async (req, res) => tagCalculationController.delete(req, res))
router.patch('/tag-calculations/:id', ensureAuthenticated, async (req, res) => tagCalculationController.update(req, res))

app.use(router)
