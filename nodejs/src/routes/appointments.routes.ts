import { Router } from 'express'
import { startOfHour, parseISO, isEqual } from 'date-fns'
import Appointment from '../models/appointment'

const appointmentsRouter = Router()

const appointments: Appointment[] = []

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body
    const parseDate = startOfHour(parseISO(date))
    const findAppointmentsEquals = appointments.find((appointment) =>
        isEqual(parseDate, appointment.date)
    )

    if (findAppointmentsEquals) {
        return response.json({
            message: 'This appointments is already booked'
        })
    }
    const appointment = new Appointment(provider, parseDate)
    appointments.push(appointment)
    return response.json(appointment)
})

appointmentsRouter.get('/', (request, response) => {
    return response.json(appointments)
})
export default appointmentsRouter
