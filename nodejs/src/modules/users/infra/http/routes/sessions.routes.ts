import { Router } from 'express'
import { container } from 'tsyringe'
import AuthenticateUserService from '@modules/users/services/authenticationUserService'

const sessionRouter = Router()

sessionRouter.post('/', async (request, response) => {
    const { email, password } = request.body
    const sessionService = container.resolve(AuthenticateUserService)

    const { user, token } = await sessionService.execute({
        email,
        password
    })

    return response.json({ user, token })
})

export default sessionRouter
