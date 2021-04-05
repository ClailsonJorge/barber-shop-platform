import { Request, Response } from 'express'
import { container } from 'tsyringe'
import CreateAppointment from '@modules/appointments/services/createAppointmentService'
import AppError from '@shared/errors/appError'

export default class AppointmentsController {
    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { provider_id, date } = request.body
        const user_id = request.user?.id
        if (!user_id) {
            throw new AppError('User does not exist.')
        }

        const createAppointment = container.resolve(CreateAppointment)
        const appointment = await createAppointment.execute({
            date,
            user_id,
            provider_id
        })
        return response.json(appointment)
    }
}
