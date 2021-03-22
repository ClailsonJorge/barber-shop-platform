import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/appError'
import User from '../infra/typeorm/entities/user'
import IUsersRepository from '../repositories/IUsersRepository'

@injectable()
export default class ShowProfileService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository
    ) {}

    public async execute(user_id: string): Promise<User> {
        const user = await this.userRepository.findById(user_id)

        if (!user) {
            throw new AppError('User does not exist.')
        }

        return user
    }
}
