import IMailProvider from '@shared/container/providers/mailProvider/models/IMailProvider'
import IUsersRepository from '../repositories/IUsersRepository'

interface IExecuteProps {
    email: string
}

class SendForgotPasswordEmail {
    constructor(
        private userRepository: IUsersRepository,
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
