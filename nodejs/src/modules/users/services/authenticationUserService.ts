import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'
import authConfig from '@config/auth'
import AppError from '@shared/errors/appError'

import User from '../infra/typeorm/entities/user'
import IUsersRepository from '../infra/repositories/IUsersRepository'
import ICreateUserDto from '../dtos/ICreateUserDto'

interface IUserReturn extends Omit<User, 'password'> {
    password?: string
}

interface IAuthenticateReturn {
    user: IUserReturn
    token: string
}

class AuthenticateUserService {
    constructor(private userRepository: IUsersRepository) {}

    public async execute({
        email,
        password
    }: Omit<ICreateUserDto, 'name'>): Promise<IAuthenticateReturn> {
        const user = await this.userRepository.findByEmail(email)
        if (!user) {
            throw new AppError('Incorrect email/password combination!', 401)
        }

        if (!compare(password, user.password)) {
            throw new AppError('Incorrect email/password combination!', 401)
        }

        const userReturn: IUserReturn = user

        const { secret, expiresIn } = authConfig.jwt
        const token = sign({}, secret, {
            subject: user.id,
            expiresIn
        })
        delete userReturn.password

        return {
            user: userReturn,
            token
        }
    }
}
export default AuthenticateUserService
