import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/appError'
import User from '../infra/typeorm/entities/user'
import ICreateUserDto from '../dtos/ICreateUserDto'
import IUsersRepository from '../repositories/IUsersRepository'
import IHashPassword from '../providers/hashProvider/models/IHashPassword'

interface IExecuteReturn extends Omit<User, 'password'> {
    password?: string
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,

        @inject('hashPassword')
        private hashPassword: IHashPassword
    ) {}

    public async execute({
        name,
        email,
        password
    }: ICreateUserDto): Promise<IExecuteReturn> {
        const checkEmailExist = await this.userRepository.findByEmail(email)

        if (checkEmailExist) {
            throw new AppError('This Email Address already registed.', 401)
        }

        const passwordHash = await this.hashPassword.hash(password)
        const user = await this.userRepository.create({
            name,
            email,
            password: passwordHash
        })

        return {
            name: user.name,
            email: user.email,
            id: user.id,
            created_at: user.created_at,
            updated_at: user.updated_at,
            avatar: user.avatar
        }
    }
}

export default CreateUserService
