import faker from 'faker'
import AppError from '@shared/errors/appError'
import FakerBCriptHashProvider from '../providers/hashProvider/fakes/fakerBCriptHashProvider'
import FakerUsersRepository from '../repositories/fakes/fakerUsersRepository'
import FakerUserTokenRepository from '../repositories/fakes/fakerUserTokenRepository'
import CreateUserService from './createUserService'
import IUserData from './utils/models/IUserData'
import ResetPasswordService from './resetPasswordService'

let fakerUsersRepository: FakerUsersRepository
let fakerUserTokenRepository: FakerUserTokenRepository
let createUser: CreateUserService
let hash: FakerBCriptHashProvider
let resetPasswordService: ResetPasswordService
let userData: IUserData

describe('ResetPasswordService', () => {
    beforeEach(() => {
        fakerUsersRepository = new FakerUsersRepository()
        fakerUserTokenRepository = new FakerUserTokenRepository()
        hash = new FakerBCriptHashProvider()
        createUser = new CreateUserService(fakerUsersRepository, hash)
        resetPasswordService = new ResetPasswordService(
            fakerUsersRepository,
            hash,
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

        const { token } = await fakerUserTokenRepository.generate(
            user?.id || '1'
        )

        const password = faker.internet.password()

        await resetPasswordService.execute({
            token,
            password
        })

        const userUpdated = await fakerUsersRepository.findById(user?.id || '1')
        const passwordOk = hash.compare(password, userUpdated?.password || '1')
        expect(passwordOk).toBeTruthy()
    })

    it('Should not be able to change password if non-exist token', async () => {
        const token = faker.random.uuid()
        const password = faker.internet.password()
        const promise = resetPasswordService.execute({
            token,
            password
        })

        await expect(promise).rejects.toBeInstanceOf(AppError)
    })

    it('Should not be able to change password if non-exist user', async () => {
        const token = faker.random.uuid()
        const password = faker.internet.password()

        jest.spyOn(
            fakerUserTokenRepository,
            'findUserByToken'
        ).mockImplementationOnce(async () => ({
            id: faker.random.uuid(),
            token,
            user_id: faker.random.uuid(),
            created_at: new Date(),
            updated_at: new Date()
        }))

        const promise = resetPasswordService.execute({ token, password })

        await expect(promise).rejects.toBeInstanceOf(AppError)
    })

    it('Should not be able to change password if token is expired', async () => {
        const token = faker.random.uuid()
        const user = await createUser.execute(userData)
        const password = faker.internet.password()

        const currentDate = new Date()
        const created_at = new Date(
            currentDate.setHours(currentDate.getHours() - 3)
        )

        jest.spyOn(
            fakerUserTokenRepository,
            'findUserByToken'
        ).mockImplementationOnce(async () => ({
            id: faker.random.uuid(),
            token,
            user_id: user?.id || '1',
            created_at,
            updated_at: currentDate
        }))

        const promise = resetPasswordService.execute({
            token,
            password
        })

        await expect(promise).rejects.toBeInstanceOf(AppError)
    })
})
