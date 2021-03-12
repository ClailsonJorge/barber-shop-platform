import faker from 'faker'
import FakerSendEmailProvider from '@shared/container/providers/mailProvider/fakes/fakerSendEmailProvider'
import AppError from '@shared/errors/appError'
import FakerUsersRepository from '../repositories/fakes/fakerUsersRepository'
import FakerHashProvider from '../providers/hashProvider/fakes/fakerBCriptHashProvider'
import CreateUserService from './createUserService'
import SendForgotPasswordEmail from './sendForgotPasswordEmailService'
import FakerUserTokenRepository from '../repositories/fakes/fakerUserTokenRepository'
import IUserData from './utils/models/IUserData'

let fakerSendEmailProvider: FakerSendEmailProvider
let fakerUsersRepository: FakerUsersRepository
let hash: FakerHashProvider
let fakerUserTokenRepository: FakerUserTokenRepository
let createUserRepository: CreateUserService
let sendForgotPasswordEmail: SendForgotPasswordEmail
let userData: IUserData

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakerSendEmailProvider = new FakerSendEmailProvider()
        fakerUsersRepository = new FakerUsersRepository()
        hash = new FakerHashProvider()
        fakerUserTokenRepository = new FakerUserTokenRepository()
        createUserRepository = new CreateUserService(fakerUsersRepository, hash)
        sendForgotPasswordEmail = new SendForgotPasswordEmail(
            fakerUsersRepository,
            fakerSendEmailProvider,
            fakerUserTokenRepository
        )
        userData = {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }
    })

    it('Should be able to send email to recover password', async () => {
        const sendEmail = jest.spyOn(fakerSendEmailProvider, 'sendEmail')

        await createUserRepository.execute(userData)
        await sendForgotPasswordEmail.execute({ email: userData.email })

        expect(sendEmail).toHaveBeenCalled()
    })

    it('Should not be able to send email to recover password when non-exist user', async () => {
        const email = faker.internet.email()

        await expect(
            sendForgotPasswordEmail.execute({ email })
        ).rejects.toBeInstanceOf(AppError)
    })

    it('Should generate a forgot password token', async () => {
        const generate = jest.spyOn(fakerUserTokenRepository, 'generate')

        const user = await createUserRepository.execute(userData)
        await sendForgotPasswordEmail.execute({ email: userData.email })

        expect(generate).toHaveBeenCalledWith(user?.id)
    })
})
