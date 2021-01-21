import { Router } from 'express'
import appointmentsRouter from './appointments.routes'
import sessionRoute from './sessions.routes'
import usersRouter from './users.routes'

const routes = Router()

routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionRoute)

export default routes
