import { Router } from 'express'
import AuthenticateUserService from '../services/authenticationUserService'

const sessionRoute = Router()

sessionRoute.post('/', async (request, response) => {
    try {
        const { email, password } = request.body
        const sessionService = new AuthenticateUserService()

        const { user } = await sessionService.execute({ email, password })

        return response.json({ user })
    } catch (error) {
        return response.status(400).json(error.message)
    }
})

export default sessionRoute
