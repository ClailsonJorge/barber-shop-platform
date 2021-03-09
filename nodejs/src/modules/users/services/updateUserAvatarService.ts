import path from 'path'
import fs from 'fs'
import { inject, injectable } from 'tsyringe'
import uploadonfig from '@config/upload'
import AppError from '@shared/errors/appError'
import User from '../infra/typeorm/entities/user'
import IUsersRepository from '../infra/repositories/IUsersRepository'

interface IExecuteParams {
    user_id: string
    avatarFileName: string
}

interface IUserResponse extends Omit<User, 'password'> {
    password?: string
}

@injectable()
export default class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository
    ) {}

    public async execute({
        user_id,
        avatarFileName
    }: IExecuteParams): Promise<IUserResponse> {
        const user = await this.userRepository.findById(user_id)

        if (!user) {
            throw new AppError('Avatar can not be updated.', 401)
        }

        if (user.avatar) {
            const userAvatarPath = path.join(uploadonfig.directory, user.avatar)
            const avatarCheckExist = await fs.promises.stat(userAvatarPath)
            if (avatarCheckExist) {
                await fs.promises.unlink(userAvatarPath)
            }
        }
        user.avatar = avatarFileName
        await this.userRepository.save(user)
        const userResponse: IUserResponse = user
        delete userResponse.password
        return userResponse
    }
}
