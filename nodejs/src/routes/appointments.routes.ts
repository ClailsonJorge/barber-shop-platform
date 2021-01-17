import { Router } from 'express'
import { v4 as uuid } from 'uuid'

type RequestTypes = {
    id?: string
    provider: string
    date: string
}
type AppointmentTypes = RequestTypes[]
const appointmentsRouter = Router()

const appointments: AppointmentTypes = []

appointmentsRouter.post('/', (request, response) => {
    const { provider, date }: RequestTypes = request.body
    const appointment = {
        id: uuid(),
        provider,
        date
    }
    appointments.push(appointment)
    return response.json(appointment)
})

appointmentsRouter.get('/', (request, response) => {
    return response.json(appointments)
})
export default appointmentsRouter
