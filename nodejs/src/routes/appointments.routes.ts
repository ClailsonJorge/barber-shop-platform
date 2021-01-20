import { Router } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import AppointmentRepository from '../repsitories/appointmentsRepository'
import CreateAppointment from '../services/createAppointmentService'

const appointmentsRouter = Router()

appointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider, date } = request.body
        const isoDate = parseISO(date)

        const createAppointment = new CreateAppointment()
        const appointment = await createAppointment.execute({
            date: isoDate,
            provider
        })
        return response.json(appointment)
    } catch (error) {
        return response.status(400).json({ message: error.message })
    }
})

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentRepository)
    const appointment = await appointmentsRepository.find()
    return response.json(appointment)
})
export default appointmentsRouter
