import { Request, Response } from 'express'
import { parseISO } from 'date-fns'
import { container } from 'tsyringe'
import CreateAppointment from '@modules/appointments/services/createAppointmentService'
import AppError from '@shared/errors/appError'

export default class AppointmentsController {
    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { provider_id, date } = request.body
        const isoDate = parseISO(date)
        const user_id = request.user?.id

        if (!user_id) {
            throw new AppError('User does not exist.')
        }

        const createAppointment = container.resolve(CreateAppointment)
        const appointment = await createAppointment.execute({
            date: isoDate,
            provider_id,
            user_id
        })
        return response.json(appointment)
    }
}
