import ISendMailDTO from '../dtos/ISendMailDTO'
import IMailProvider from '../models/IMailProvider'

class FakerSendEmailProvider implements IMailProvider {
    message: ISendMailDTO[] = []

    public async sendEmail(data: ISendMailDTO): Promise<void> {
        this.message.push(data)
    }
}

export default FakerSendEmailProvider
