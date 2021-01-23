import { Router } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import { AppointmentRepository } from '../repsitories'
import { CreateAppointment } from '../services'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const appointmentsRouter = Router()
appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider_id, date } = request.body
        const isoDate = parseISO(date)

        const createAppointment = new CreateAppointment()
        const appointment = await createAppointment.execute({
            date: isoDate,
            provider_id
        })
        return response.json(appointment)
    } catch (error) {
        return response
            .status(error.statusCode)
            .json({ message: error.message })
    }
})

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentRepository)
    const appointment = await appointmentsRepository.find()
    return response.json(appointment)
})
export default appointmentsRouter
