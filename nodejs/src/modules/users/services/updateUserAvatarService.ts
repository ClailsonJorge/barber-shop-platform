import { getRepository } from 'typeorm'
import path from 'path'
import fs from 'fs'
import uploadonfig from '@config/upload'
import AppError from '@shared/errors/appError'
import User from '../infra/typeorm/entities/user'

interface ExecuteParams {
    user_id: string
    avatarFileName: string
}

interface UserResponse extends Omit<User, 'password'> {
    password?: string
}

export default class UpdateUserAvatarService {
    public async execute({
        user_id,
        avatarFileName
    }: ExecuteParams): Promise<UserResponse> {
        const usersRepository = getRepository(User)
        const user = await usersRepository.findOne(user_id)

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
        await usersRepository.save(user)
        const userResponse: UserResponse = user
        delete userResponse.password
        return userResponse
    }
}
