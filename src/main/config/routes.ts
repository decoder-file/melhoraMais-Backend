import express, { Router, json } from 'express'
import cors from 'cors'

import { UserController } from '@/controllers'

export const app = express()
const router = Router()
const userController = new UserController()

app.use(cors())
app.use(json())

router.post('/users', async (req, res) => userController.create(req, res))
router.get('/users', async (req, res) => userController.get(req, res))
router.get('/users/:id', async (req, res) => userController.getById(req, res))
router.delete('/users/:id', async (req, res) => userController.delete(req, res))
router.patch('/users/:id', async (req, res) => userController.update(req, res))

app.use(router)
