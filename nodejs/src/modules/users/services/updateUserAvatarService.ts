import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/appError'
import IStorageProvider from '@shared/container/providers/diskStorage/models/IStorageProvider'
import User from '../infra/typeorm/entities/user'
import IUsersRepository from '../repositories/IUsersRepository'

interface IExecuteParams {
    user_id: string
    avatarFileName: string
}

@injectable()
export default class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,

        @inject('diskStorageProvider')
        private diskStorage: IStorageProvider
    ) {}

    public async execute({
        user_id,
        avatarFileName
    }: IExecuteParams): Promise<User> {
        const user = await this.userRepository.findById(user_id)

        if (!user) {
            throw new AppError('Avatar can not be updated.', 401)
        }

        if (user.avatar) {
            await this.diskStorage.deleteFile(user.avatar)
        }

        const filePath = await this.diskStorage.saveFile(avatarFileName)

        user.avatar = filePath

        await this.userRepository.save(user)

        return user
    }
}
