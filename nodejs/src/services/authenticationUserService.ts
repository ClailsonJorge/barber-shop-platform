import { sign } from 'jsonwebtoken'
import { getRepository } from 'typeorm'
import { compare } from 'bcrypt'
import User from '../models/user'

interface ExecuteParams {
    email: string
    password: string
}

interface UserReturn extends Omit<User, 'password'> {
    password?: string
}

interface AuthenticateReturn {
    user: UserReturn
    token: string
}

class AuthenticateUserService {
    public async execute({
        email,
        password
    }: ExecuteParams): Promise<AuthenticateReturn> {
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
        const userReturn: UserReturn = user
        const token = sign({}, 'kkkkkkkkkk', {
            subject: user.id,
            expiresIn: '1d'
        })
        delete userReturn.password

        return {
            user: userReturn,
            token
        }
    }
}
export default AuthenticateUserService
