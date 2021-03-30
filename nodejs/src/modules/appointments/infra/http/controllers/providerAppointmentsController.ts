import { Request, Response } from 'express'
import { container } from 'tsyringe'
import AppError from '@shared/errors/appError'
import ListProviderAppointmentsService from '@modules/appointments/services/listProviderAppointmentsServices'

export default class ProviderAppointmentsController {
    public async index(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { day, month, year } = request.body
        const provider_id = request.user?.id

        if (!provider_id) {
            throw new AppError('User does not exist.')
        }

        const listProviderAppointmentsService = container.resolve(
            ListProviderAppointmentsService
        )

        const appointments = await listProviderAppointmentsService.execute({
            provider_id,
            day,
            month,
            year
        })

        return response.json(appointments)
    }
}
