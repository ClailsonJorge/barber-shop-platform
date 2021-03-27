import { Request, Response } from 'express'
import { container } from 'tsyringe'
import ListProviderDayAvailability from '@modules/appointments/services/listProviderDayAvailabilityService'

export default class ProviderDayAvailabilityController {
    public async index(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { provider_id } = request.params
        const { month, day, year } = request.body

        const listProviderDayAvailability = container.resolve(
            ListProviderDayAvailability
        )

        const availability = await listProviderDayAvailability.execute({
            day,
            month,
            provider_id,
            year
        })

        return response.json(availability)
    }
}
