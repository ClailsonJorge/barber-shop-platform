import { Router } from 'express'
import { startOfHour, parseISO } from 'date-fns'
import AppointmentRepository from '../repsitories/appointmentsRepository'

const appointmentsRouter = Router()

const appointments = new AppointmentRepository()

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body
    const parseDate = startOfHour(parseISO(date))
    const findAppointmentsEquals = appointments.findByDate(parseDate)

    if (findAppointmentsEquals) {
        return response.json({
            message: 'This appointments is already booked'
        })
    }
    const appointment = appointments.create(provider, parseDate)
    return response.json(appointment)
})

appointmentsRouter.get('/', (request, response) => {
    const appointment = appointments.all()
    return response.json(appointment)
})
export default appointmentsRouter
