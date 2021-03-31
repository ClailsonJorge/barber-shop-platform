import { Router } from 'express'
import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated'
import { celebrate, Segments, Joi } from 'celebrate'
import AppointmentsController from '../controllers/appointmentsController'
import ProviderAppointmentsController from '../controllers/providerAppointmentsController'

const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()
const providerAppointmentsController = new ProviderAppointmentsController()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            provider_id: Joi.string().uuid().required(),
            date: Joi.date()
        }
    }),
    appointmentsController.create
)

appointmentsRouter.get('/me', providerAppointmentsController.index)

export default appointmentsRouter
