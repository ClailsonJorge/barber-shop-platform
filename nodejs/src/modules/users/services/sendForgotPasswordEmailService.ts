import { inject, injectable } from 'tsyringe'
import IMailProvider from '@shared/container/providers/mailProvider/models/IMailProvider'
import AppError from '@shared/errors/appError'
import IUsersRepository from '../repositories/IUsersRepository'
import IUserTokenRepository from '../repositories/IUserTokenRepository'

interface IExecuteProps {
    email: string
}

@injectable()
class SendForgotPasswordEmail {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,

        @inject('SendEmailProvider')
        private sendEmailProvider: IMailProvider,

        @inject('UserTokenRepositiry')
        private userTokenRepository: IUserTokenRepository
    ) {}

    public async execute({ email }: IExecuteProps): Promise<void> {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new AppError('User does not exist.')
        }

        await this.sendEmailProvider.sendEmail(
            email,
            'Texto que será enviado ao email'
        )

        await this.userTokenRepository.generate(user.id)
    }
}

export default SendForgotPasswordEmail
