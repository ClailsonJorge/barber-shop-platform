import AppError from '@shared/errors/appError'
import faker from 'faker'
import FakerBCriptHashProvider from '../providers/hashProvider/fakes/fakerBCriptHashProvider'
import FakerUsersRepository from '../repositories/fakes/fakerUsersRepository'
import AuthenticateUserService from './authenticationUserService'
import CreateUserService from './createUserService'

describe('Authenticate User', () => {
    it('Should be able authenticate User', async () => {
        const fakerUserRepository = new FakerUsersRepository()
        const hashPassword = new FakerBCriptHashProvider()
        const authenticateUser = new AuthenticateUserService(
            fakerUserRepository,
            hashPassword
        )
        const createUserRepository = new CreateUserService(
            fakerUserRepository,
            hashPassword
        )

        const userData = {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }

        await createUserRepository.execute(userData)

        const user = await authenticateUser.execute({
            email: userData.email,
            password: userData.password
        })

        expect(user).toHaveProperty('token')
    })

    it('Should be not able authenticate User when the password is wrong', async () => {
        const fakerUserRepository = new FakerUsersRepository()
        const hashPassword = new FakerBCriptHashProvider()
        const authenticateUser = new AuthenticateUserService(
            fakerUserRepository,
            hashPassword
        )
        const createUserRepository = new CreateUserService(
            fakerUserRepository,
            hashPassword
        )

        const userData = {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }

        await createUserRepository.execute(userData)

        const user = authenticateUser.execute({
            email: userData.email,
            password: faker.internet.password()
        })
        expect(user).rejects.toBeInstanceOf(AppError)
    })

    it('Should be not able authenticate User when not exist User', async () => {
        const fakerUserRepository = new FakerUsersRepository()
        const hashPassword = new FakerBCriptHashProvider()
        const authenticateUser = new AuthenticateUserService(
            fakerUserRepository,
            hashPassword
        )

        const user = authenticateUser.execute({
            email: faker.internet.email(),
            password: faker.internet.password()
        })

        await expect(user).rejects.toBeInstanceOf(AppError)
    })
})
