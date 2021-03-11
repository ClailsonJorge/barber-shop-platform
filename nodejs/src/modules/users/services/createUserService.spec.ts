import faker from 'faker'
import AppError from '@shared/errors/appError'
import FakerUsersRepository from '../repositories/fakes/fakerUsersRepository'
import FakerBCriptHashProvider from '../providers/hashProvider/fakes/fakerBCriptHashProvider'
import CreateUserService from './createUserService'

const makeSut = async () => {
    const fakerUserRepository = new FakerUsersRepository()
    const hashPassword = new FakerBCriptHashProvider()
    const createUserRepository = new CreateUserService(
        fakerUserRepository,
        hashPassword
    )

    const userData = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    }

    const userRepository = await createUserRepository.execute(userData)

    return {
        createUserRepository,
        userData,
        userRepository
    }
}

describe('Create UserRepository', () => {
    it('Should be able to create a new user repository', async () => {
        const { userRepository } = await makeSut()
        expect(userRepository).toHaveProperty('id')
    })

    it('Should be not able to create a duplicate user repository', async () => {
        const { createUserRepository, userData } = await makeSut()
        expect(createUserRepository.execute(userData)).rejects.toBeInstanceOf(
            AppError
        )
    })
})
