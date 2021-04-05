import faker from 'faker'
import AppError from '@shared/errors/appError'
import FakeCacheProvider from '@shared/container/providers/cacheProvider/fake/fakerCacheProvider'
import FakerUsersRepository from '../repositories/fakes/fakerUsersRepository'
import FakerBCriptHashProvider from '../providers/hashProvider/fakes/fakerBCriptHashProvider'
import CreateUserService from './createUserService'

const makeSut = async () => {
    const fakeCacheProvider = new FakeCacheProvider()
    const fakerUserRepository = new FakerUsersRepository()
    const hashPassword = new FakerBCriptHashProvider()
    const createUserRepository = new CreateUserService(
        fakerUserRepository,
        hashPassword,
        fakeCacheProvider
    )

    const userData = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    }

    const userRepository = await createUserRepository.execute(userData)

    return {
        fakerUserRepository,
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
        await expect(
            createUserRepository.execute(userData)
        ).rejects.toBeInstanceOf(AppError)
    })

    it('Should be not able to return user', async () => {
        const { createUserRepository, fakerUserRepository } = await makeSut()
        jest.spyOn(fakerUserRepository, 'create').mockImplementationOnce(
            async () => undefined
        )
        const user = createUserRepository.execute({
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        })
        await expect(user).rejects.toBeInstanceOf(AppError)
    })
})
