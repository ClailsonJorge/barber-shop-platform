import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/appError'
import User from '../infra/typeorm/entities/user'
import ICreateUserDto from '../dtos/ICreateUserDto'
import IUsersRepository from '../repositories/IUsersRepository'
import IHashPassword from '../providers/hashProvider/models/IHashPassword'

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
    }: ICreateUserDto): Promise<User> {
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

        if (!user) {
            throw new AppError('Error create user.')
        }

        return user
    }
}

export default CreateUserService
