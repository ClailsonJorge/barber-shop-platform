import { getRepository } from 'typeorm'
import { compare } from 'bcrypt'
import { Router } from 'express'
import User from '../models/user'

const sessionRoute = Router()

interface ExecuteParams {
    email: string
    password: string
}

interface AuthenticateReturn extends Omit<User, 'password'> {
    password?: string
}

class AuthenticateUserService {
    public async execute({
        email,
        password
    }: ExecuteParams): Promise<{ user: AuthenticateReturn }> {
        const usersRepository = getRepository(User)
        const user = await usersRepository.findOne({
            where: { email }
        })

        if (!user) {
            throw new Error('Incorrect email/password combination!')
        }

        if (!compare(password, user.password)) {
            throw new Error('Incorrect email/password combination!')
        }
        const userReturn: AuthenticateReturn = user
        delete userReturn.password

        return { user: userReturn }
    }
}

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
