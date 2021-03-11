import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import authConfig from '@config/auth'
import AppError from '@shared/errors/appError'

import User from '../infra/typeorm/entities/user'
import IUsersRepository from '../repositories/IUsersRepository'
import ICreateUserDto from '../dtos/ICreateUserDto'
import IHashPassword from '../providers/hashProvider/models/IHashPassword'

interface IUserReturn extends Omit<User, 'password'> {
    password?: string
}

interface IAuthenticateReturn {
    user: IUserReturn
    token: string
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,

        @inject('hashPassword')
        private hashPassword: IHashPassword
    ) {}

    public async execute({
        email,
        password
    }: Omit<ICreateUserDto, 'name'>): Promise<IAuthenticateReturn> {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new AppError('Incorrect email/password combination!', 401)
        }

        if (!(await this.hashPassword.compare(password, user.password))) {
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
