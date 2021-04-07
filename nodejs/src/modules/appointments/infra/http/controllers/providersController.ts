import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'
import ListProvidersServices from '@modules/appointments/services/listProvidersServices'
import AppError from '@shared/errors/appError'

export default class ProvidersController {
    public async index(
        request: Request,
        response: Response
    ): Promise<Response> {
        const provider_id = request.user?.id

        if (!provider_id) {
            throw new AppError('User_Id does not exist.')
        }

        const listProvidersServices = container.resolve(ListProvidersServices)

        const providers = await listProvidersServices.execute({
            user_id: provider_id
        })

        const providerWithoutPassword = providers.map((provider) => {
            return classToClass(provider)
        })

        return response.json(providerWithoutPassword)
    }
}
