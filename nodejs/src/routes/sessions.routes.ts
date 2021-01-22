import { Router } from 'express'
import { AuthenticateUserService } from '../services'

const sessionRouter = Router()

sessionRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body
        const sessionService = new AuthenticateUserService()

        const { user, token } = await sessionService.execute({
            email,
            password
        })

        return response.json({ user, token })
    } catch (error) {
        return response.status(400).json(error.message)
    }
})

export default sessionRouter