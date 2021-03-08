import { Router } from 'express'
import AuthenticateUserService from '@modules/users/services/authenticationUserService'
import UsersRepository from '../../typeorm/repositories/usersRepository'

const sessionRouter = Router()

sessionRouter.post('/', async (request, response) => {
    const userRepository = new UsersRepository()
    const { email, password } = request.body
    const sessionService = new AuthenticateUserService(userRepository)

    const { user, token } = await sessionService.execute({
        email,
        password
    })

    return response.json({ user, token })
})

export default sessionRouter
