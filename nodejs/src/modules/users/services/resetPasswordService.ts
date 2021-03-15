import AppError from '@shared/errors/appError'
import IHashPassword from '../providers/hashProvider/models/IHashPassword'
import IUsersRepository from '../repositories/IUsersRepository'
import IUserTokenRepository from '../repositories/IUserTokenRepository'

interface IResetParams {
    token: string
    password: string
}

export default class ResetPasswordService {
    timeExpireTokenMs = 2

    constructor(
        private usersRepository: IUsersRepository,
        private hashProvider: IHashPassword,
        private userTokenRepository: IUserTokenRepository
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

        if (
            new Date(Date.now()).getHours() - userToken.created_at.getHours() >
            this.timeExpireTokenMs
        ) {
            throw new AppError('Token is expired.')
        }

        user.password = passwordHash
    }
}
