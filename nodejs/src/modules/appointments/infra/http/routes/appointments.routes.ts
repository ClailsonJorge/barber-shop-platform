import { Router } from 'express'
import { parseISO } from 'date-fns'
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/appointmentsRepository'
import CreateAppointment from '@modules/appointments/services/createAppointmentService'
import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated'

const appointmentsRouter = Router()
appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.post('/', async (request, response) => {
    const appointmentsRepository = new AppointmentRepository()
    const { provider_id, date } = request.body
    const isoDate = parseISO(date)

    const createAppointment = new CreateAppointment(appointmentsRepository)
    const appointment = await createAppointment.execute({
        date: isoDate,
        provider_id
    })
    return response.json(appointment)
})

// appointmentsRouter.get('/', async (request, response) => {
//     const appointmentsRepository = getCustomRepository(AppointmentRepository)
//     const appointment = await appointmentsRepository.find()
//     return response.json(appointment)
// })

export default appointmentsRouter
