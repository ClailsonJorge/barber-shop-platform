import AppError from '@shared/errors/appError'
import faker from 'faker'
import FakerBCriptHashProvider from '../providers/hashProvider/fakes/fakerBCriptHashProvider'
import FakerUsersRepository from '../repositories/fakes/fakerUsersRepository'
import AuthenticateUserService from './authenticationUserService'
import CreateUserService from './createUserService'
import IUserData from './utils/models/IUserData'

let fakerUserRepository: FakerUsersRepository
let hashPassword: FakerBCriptHashProvider
let authenticateUser: AuthenticateUserService
let createUserRepository: CreateUserService
let userData: IUserData

describe('Authenticate User', () => {
    beforeEach(() => {
        fakerUserRepository = new FakerUsersRepository()
        hashPassword = new FakerBCriptHashProvider()
        authenticateUser = new AuthenticateUserService(
            fakerUserRepository,
            hashPassword
        )
        createUserRepository = new CreateUserService(
            fakerUserRepository,
            hashPassword
        )

        userData = {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }
    })
    it('Should be able authenticate User', async () => {
        await createUserRepository.execute(userData)

        const user = await authenticateUser.execute({
            email: userData.email,
            password: userData.password
        })

        expect(user).toHaveProperty('token')
    })

    it('Should be not able authenticate User when the password is wrong', async () => {
        await createUserRepository.execute(userData)

        const user = authenticateUser.execute({
            email: userData.email,
            password: faker.internet.password()
        })
        await expect(user).rejects.toBeInstanceOf(AppError)
    })

    it('Should be not able authenticate User when not exist User', async () => {
        const user = authenticateUser.execute({
            email: faker.internet.email(),
            password: faker.internet.password()
        })

        await expect(user).rejects.toBeInstanceOf(AppError)
    })
})
