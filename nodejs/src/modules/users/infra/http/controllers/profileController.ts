import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UpdateProfileService from '@modules/users/services/updateProfileService'
import ShowProfileService from '@modules/users/services/showProfileService'

export default class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const user_id = request.user?.id || 'undefined'

        const showProfile = container.resolve(ShowProfileService)

        const user = await showProfile.execute(user_id)

        user.password = ''

        return response.json(user)
    }

    public async update(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { name, email, old_password, password } = request.body
        const user_id = request.user?.id || 'undefined'
        const updateUser = container.resolve(UpdateProfileService)
        const user = await updateUser.execute({
            user_id,
            name,
            email,
            password,
            old_password
        })

        user.password = ''

        return response.json(user)
    }
}
