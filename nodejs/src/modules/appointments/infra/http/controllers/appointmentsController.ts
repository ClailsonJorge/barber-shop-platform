import { Request, Response } from 'express'
import { parseISO } from 'date-fns'
import { container } from 'tsyringe'
import CreateAppointment from '@modules/appointments/services/createAppointmentService'

export default class AppointmentsController {
    async create(request: Request, response: Response): Promise<Response> {
        const { provider_id, date } = request.body
        const isoDate = parseISO(date)

        const createAppointment = container.resolve(CreateAppointment)
        const appointment = await createAppointment.execute({
            date: isoDate,
            provider_id
        })
        return response.json(appointment)
    }
}
