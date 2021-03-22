import { inject, injectable } from 'tsyringe'
import path from 'path'
import IMailProvider from '@shared/container/providers/mailProvider/models/IMailProvider'
import AppError from '@shared/errors/appError'
import IUsersRepository from '../repositories/IUsersRepository'
import IUserTokensRepository from '../repositories/IUserTokensRepository'

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

        @inject('UserTokensRepository')
        private userTokenRepository: IUserTokensRepository
    ) {}

    public async execute({ email }: IExecuteProps): Promise<void> {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new AppError('User does not exist.')
        }

        const userToken = await this.userTokenRepository.generate(user.id)

        if (!userToken) {
            throw new AppError('Do not possible to send E-mail')
        }

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'forgotPassword.hbs'
        )

        await this.sendEmailProvider.sendEmail({
            to: {
                name: user.name,
                email: user.email
            },
            subject: '[GoBarber] Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `http://localhost:3000/reset_password?token=${userToken.token}`
                }
            }
        })
    }
}

export default SendForgotPasswordEmail
