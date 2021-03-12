import FakerSendEmailProvider from '@shared/container/providers/mailProvider/fakes/fakerSendEmailProvider'
import faker from 'faker'
import AppError from '@shared/errors/appError'
import FakerBCriptHashProvider from '../providers/hashProvider/fakes/fakerBCriptHashProvider'
import FakerUsersRepository from '../repositories/fakes/fakerUsersRepository'
import FakerUserTokenRepository from '../repositories/fakes/fakerUserTokenRepository'
import CreateUserService from './createUserService'
import SendForgotPasswordEmail from './sendForgotPasswordEmailService'
import IUserData from './utils/models/IUserData'
import ResetPasswordService from './resetPasswordService'
import UserToken from '../infra/typeorm/entities/userToken'

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

    it('Should not be able to change password if non-exist token', async () => {
        const user_id = faker.random.uuid()
        const password = faker.internet.password()
        const promise = resetPasswordService.execute({
            user_id,
            password
        })

        await expect(promise).rejects.toBeInstanceOf(AppError)
    })

    it('Should not be able to change password if non-exist user', async () => {
        const user_id = faker.random.uuid()
        const password = faker.internet.password()

        jest.spyOn(
            fakerUserTokenRepository,
            'findUserTokenById'
        ).mockImplementationOnce(async () => ({
            id: faker.random.uuid(),
            token: faker.random.uuid(),
            user_id,
            created_at: new Date(),
            updated_at: new Date()
        }))

        const promise = resetPasswordService.execute({ user_id, password })

        await expect(promise).rejects.toBeInstanceOf(AppError)
    })

    it('Should not be able to change password if token is expired', async () => {
        const user = await createUser.execute(userData)
        const password = faker.internet.password()

        const currentDate = new Date()
        const created_at = new Date(
            currentDate.setHours(currentDate.getHours() - 3)
        )

        jest.spyOn(
            fakerUserTokenRepository,
            'findUserTokenById'
        ).mockImplementationOnce(async () => ({
            id: faker.random.uuid(),
            token: faker.random.uuid(),
            user_id: user?.id || '1',
            created_at,
            updated_at: currentDate
        }))

        const promise = resetPasswordService.execute({
            user_id: user?.id || '1',
            password
        })

        await expect(promise).rejects.toBeInstanceOf(AppError)
    })
})
