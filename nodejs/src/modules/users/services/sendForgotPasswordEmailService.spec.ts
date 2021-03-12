import faker from 'faker'
import FakerSendEmailProvider from '@shared/container/providers/mailProvider/fakes/fakerSendEmailProvider'
import AppError from '@shared/errors/appError'
import FakerUsersRepository from '../repositories/fakes/fakerUsersRepository'
import FakerHashProvider from '../providers/hashProvider/fakes/fakerBCriptHashProvider'
import CreateUserService from './createUserService'
import SendForgotPasswordEmail from './sendForgotPasswordEmailService'

describe('SendForgotPasswordEmail', () => {
    it('Should be able to send email to recover password', async () => {
        const fakerSendEmailProvider = new FakerSendEmailProvider()
        const fakerUsersRepository = new FakerUsersRepository()
        const hash = new FakerHashProvider()
        const createUserRepository = new CreateUserService(
            fakerUsersRepository,
            hash
        )
        const sendEmail = jest.spyOn(fakerSendEmailProvider, 'sendEmail')
        const sendForgotPasswordEmail = new SendForgotPasswordEmail(
            fakerUsersRepository,
            fakerSendEmailProvider
        )

        const userData = {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }

        await createUserRepository.execute(userData)
        await sendForgotPasswordEmail.execute({ email: userData.email })

        expect(sendEmail).toHaveBeenCalled()
    })

    it('Should not be able to send email to recover password when non-exist user', async () => {
        const fakerSendEmailProvider = new FakerSendEmailProvider()
        const fakerUsersRepository = new FakerUsersRepository()

        const sendForgotPasswordEmail = new SendForgotPasswordEmail(
            fakerUsersRepository,
            fakerSendEmailProvider
        )

        const email = faker.internet.email()

        await expect(
            sendForgotPasswordEmail.execute({ email })
        ).rejects.toBeInstanceOf(AppError)
    })
})
