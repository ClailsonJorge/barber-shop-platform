import { Router } from 'express'
import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated'
import AppointmentsController from '../controllers/appointmentsController'
import ProviderAppointmentsController from '../controllers/providerAppointmentsController'

const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()
const providerAppointmentsController = new ProviderAppointmentsController()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.post('/', appointmentsController.create)

appointmentsRouter.get('/me', providerAppointmentsController.index)

export default appointmentsRouter
