import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/appError'
import IHashPassword from '../providers/hashProvider/models/IHashPassword'
import User from '../infra/typeorm/entities/user'
import IUsersRepository from '../repositories/IUsersRepository'

interface IExecuteParams {
    user_id: string
    name: string
    email: string
    old_password?: string
    password?: string
}

@injectable()
export default class UpdateProfileService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,

        @inject('hashPassword')
        private hashPassword: IHashPassword
    ) {}

    public async execute({
        user_id,
        name,
        email,
        old_password,
        password
    }: IExecuteParams): Promise<User> {
        const user = await this.userRepository.findById(user_id)

        if (!user) {
            throw new AppError('User does not exist.')
        }

        const userByEmail = await this.userRepository.findByEmail(email)

        if (userByEmail && userByEmail.id !== user.id) {
            throw new AppError('Email already exist.')
        }

        if (old_password && password) {
            const checkPassword = await this.hashPassword.compare(
                old_password,
                user.password
            )

            if (!checkPassword) {
                throw new AppError('Old Password is incorrect.')
            }

            const newHashPassword = await this.hashPassword.hash(password)
            user.password = newHashPassword
        }

        user.email = email
        user.name = name

        const userUpadated = await this.userRepository.save(user)

        if (!userUpadated) {
            throw new AppError('Unpossible to update user.')
        }

        return userUpadated
    }
}
