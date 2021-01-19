import { Router } from 'express'
import { parseISO } from 'date-fns'
import AppointmentRepository from '../repsitories/appointmentsRepository'
import CreateAppointment from '../services/createAppointment'

const appointmentsRouter = Router()

const appointments = new AppointmentRepository()

appointmentsRouter.post('/', (request, response) => {
    try {
        const { provider, date } = request.body
        const isoDate = parseISO(date)

        const createAppointment = new CreateAppointment(appointments)
        const appointment = createAppointment.execute({
            date: isoDate,
            provider
        })
        return response.json(appointment)
    } catch (error) {
        return response.status(400).json({ message: error.message })
    }
})

appointmentsRouter.get('/', (request, response) => {
    const appointment = appointments.all()
    return response.json(appointment)
})
export default appointmentsRouter
