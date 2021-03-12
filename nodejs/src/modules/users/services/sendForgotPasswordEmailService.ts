import { inject, injectable } from 'tsyringe'
import IMailProvider from '@shared/container/providers/mailProvider/models/IMailProvider'
import AppError from '@shared/errors/appError'
import IUsersRepository from '../repositories/IUsersRepository'

interface IExecuteProps {
    email: string
}

@injectable()
class SendForgotPasswordEmail {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,

        @inject('SendEmailProvider')
        private sendEmailProvider: IMailProvider
    ) {}

    public async execute({ email }: IExecuteProps): Promise<void> {
        const checkUserExist = await this.userRepository.findByEmail(email)

        if (!checkUserExist) {
            throw new AppError('User not exist.')
        }

        await this.sendEmailProvider.sendEmail(
            email,
            'Texto que será enviado ao email'
        )
    }
}

export default SendForgotPasswordEmail
