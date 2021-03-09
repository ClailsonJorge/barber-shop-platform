import { Router } from 'express'
import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated'
import AppointmentsController from '../controllers/appointmentsController'

const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()
appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.post('/', appointmentsController.create)

// appointmentsRouter.get('/', async (request, response) => {
//     const appointmentsRepository = getCustomRepository(AppointmentRepository)
//     const appointment = await appointmentsRepository.find()
//     return response.json(appointment)
// })

export default appointmentsRouter
