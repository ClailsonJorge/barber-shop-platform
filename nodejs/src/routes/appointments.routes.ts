import { Router } from 'express'
import { v4 as uuid } from 'uuid'
import { startOfHour, parseISO, isEqual } from 'date-fns'

type AppointmentTypes = {
    id: string
    provider: string
    date: Date
}

const appointmentsRouter = Router()

const appointments: AppointmentTypes[] = []

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
    const appointment = {
        id: uuid(),
        provider,
        date: parseDate
    }
    appointments.push(appointment)
    return response.json(appointment)
})

appointmentsRouter.get('/', (request, response) => {
    return response.json(appointments)
})
export default appointmentsRouter
