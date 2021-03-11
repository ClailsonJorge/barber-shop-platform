import { inject, injectable } from 'tsyringe'
import IMailProvider from '@shared/container/providers/mailProvider/models/IMailProvider'
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
        this.sendEmailProvider.sendEmail(
            email,
            'Texto que será enviado ao email'
        )
    }
}

export default SendForgotPasswordEmail
