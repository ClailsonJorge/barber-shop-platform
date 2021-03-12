import FakerSendEmailProvider from '@shared/container/providers/mailProvider/fakes/fakerSendEmailProvider'
import faker from 'faker'
import FakerBCriptHashProvider from '../providers/hashProvider/fakes/fakerBCriptHashProvider'
import FakerUsersRepository from '../repositories/fakes/fakerUsersRepository'
import FakerUserTokenRepository from '../repositories/fakes/fakerUserTokenRepository'
import CreateUserService from './createUserService'
import SendForgotPasswordEmail from './sendForgotPasswordEmailService'
import IUserData from './utils/models/IUserData'
import ResetPasswordService from './resetPasswordService'

let fakerUsersRepository: FakerUsersRepository
let fakerUserTokenRepository: FakerUserTokenRepository
let createUser: CreateUserService
let sendForgotPasswordEmail: SendForgotPasswordEmail
let hash: FakerBCriptHashProvider
let fakerSendEmailProvider: FakerSendEmailProvider
let resetPasswordService: ResetPasswordService
let userData: IUserData

describe('ResetPasswordService', () => {
    beforeEach(() => {
        fakerUsersRepository = new FakerUsersRepository()
        fakerUserTokenRepository = new FakerUserTokenRepository()
        hash = new FakerBCriptHashProvider()
        fakerSendEmailProvider = new FakerSendEmailProvider()
        createUser = new CreateUserService(fakerUsersRepository, hash)
        resetPasswordService = new ResetPasswordService(
            fakerUsersRepository,
            hash,
            fakerUserTokenRepository
        )
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

    it('Should be able to change password', async () => {
        const user = await createUser.execute(userData)

        await sendForgotPasswordEmail.execute({
            email: userData.email
        })

        const password = faker.internet.password()

        await resetPasswordService.execute({
            user_id: user?.id || '1',
            password
        })

        const userUpdated = await fakerUsersRepository.findById(user?.id || '1')
        const passwordOk = hash.compare(password, userUpdated?.password || '1')
        expect(passwordOk).toBeTruthy()
    })
})
