import AppError from '@shared/errors/appError'
import IHashPassword from '../providers/hashProvider/models/IHashPassword'
import IUsersRepository from '../repositories/IUsersRepository'
import IUserTokenRepository from '../repositories/IUserTokenRepository'

interface IResetParams {
    user_id: string
    password: string
}

export default class ResetPasswordService {
    constructor(
        private usersRepository: IUsersRepository,
        private hashProvider: IHashPassword,
        private userTokenRepository: IUserTokenRepository
    ) {}

    public async execute({ user_id, password }: IResetParams): Promise<void> {
        const userToken = await this.userTokenRepository.findUserTokenById(
            user_id
        )

        if (!userToken) {
            throw new AppError('It does not valid token.')
        }

        const passwordHash = await this.hashProvider.hash(password)

        const user = await this.usersRepository.findById(user_id)

        if (!user) {
            throw new AppError('User does not exist.')
        }

        user.password = passwordHash
    }
}
