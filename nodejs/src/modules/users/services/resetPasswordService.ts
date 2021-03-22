import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/appError'
import IHashPassword from '../providers/hashProvider/models/IHashPassword'
import IUsersRepository from '../repositories/IUsersRepository'
import IUserTokensRepository from '../repositories/IUserTokensRepository'

interface IResetParams {
    token: string
    password: string
}

@injectable()
export default class ResetPasswordService {
    timeExpireTokenMs = 7200000

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('hashPassword')
        private hashProvider: IHashPassword,
        @inject('UserTokensRepository')
        private userTokenRepository: IUserTokensRepository
    ) {}

    public async execute({ token, password }: IResetParams): Promise<void> {
        const userToken = await this.userTokenRepository.findUserByToken(token)

        if (!userToken?.token) {
            throw new AppError('It does not valid token.')
        }

        const passwordHash = await this.hashProvider.hash(password)

        const user = await this.usersRepository.findById(userToken.user_id)

        if (!user) {
            throw new AppError('User does not exist.')
        }
        const timetoken = userToken.created_at.getTime()
        const currentTime = new Date().getTime()

        if (currentTime - timetoken > this.timeExpireTokenMs) {
            throw new AppError('Token is expired.')
        }

        user.password = passwordHash
    }
}
