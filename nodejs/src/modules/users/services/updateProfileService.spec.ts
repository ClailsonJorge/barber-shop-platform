import faker from 'faker'
import AppError from '@shared/errors/appError'
import FakeCacheProvider from '@shared/container/providers/cacheProvider/fake/fakerCacheProvider'
import FakerUsersRepository from '../repositories/fakes/fakerUsersRepository'
import FakerHashProvider from '../providers/hashProvider/fakes/fakerBCriptHashProvider'
import CreateUserService from './createUserService'
import UpdateProfileService from './updateProfileService'
import IUserData from './utils/models/IUserData'

let fakerUsersRepository: FakerUsersRepository
let fakeCacheProvider: FakeCacheProvider
let hash: FakerHashProvider
let createUserRepository: CreateUserService
let updateProfileService: UpdateProfileService
let userData: IUserData

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakerUsersRepository = new FakerUsersRepository()
        fakeCacheProvider = new FakeCacheProvider()
        hash = new FakerHashProvider()
        createUserRepository = new CreateUserService(
            fakerUsersRepository,
            hash,
            fakeCacheProvider
        )
        updateProfileService = new UpdateProfileService(
            fakerUsersRepository,
            hash
        )
        userData = {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }
    })

    it('Should be able to update the provider.', async () => {
        const user = await createUserRepository.execute(userData)

        const userUpdated = await updateProfileService.execute({
            user_id: user.id,
            name: 'Jorge',
            email: 'jorge@gmail.com'
        })

        expect(userUpdated.name).toBe('Jorge')
        expect(userUpdated.email).toBe('jorge@gmail.com')
    })

    it('Should not be able to update the provider when user does not exist.', async () => {
        const userUpdated = updateProfileService.execute({
            user_id: faker.random.uuid(),
            name: 'Jorge',
            email: 'jorge@gmail.com'
        })

        await expect(userUpdated).rejects.toBeInstanceOf(AppError)
    })

    it('Should not be able to update the provider when user does not updated.', async () => {
        const user = await createUserRepository.execute(userData)

        jest.spyOn(fakerUsersRepository, 'save').mockImplementationOnce(
            async () => undefined
        )

        const userUpdated = updateProfileService.execute({
            user_id: user.id,
            name: 'Jorge',
            email: 'jorge@gmail.com'
        })

        await expect(userUpdated).rejects.toBeInstanceOf(AppError)
    })

    it('Should not be able to change email when email already exist.', async () => {
        const user = await createUserRepository.execute(userData)

        await createUserRepository.execute({
            name: 'Bobs',
            email: 'jorge@gmail.com',
            password: '123123'
        })

        const userUpdated = updateProfileService.execute({
            user_id: user.id,
            name: 'Jorge',
            email: 'jorge@gmail.com'
        })

        await expect(userUpdated).rejects.toBeInstanceOf(AppError)
    })

    it('Should be able to change password.', async () => {
        const user = await createUserRepository.execute(userData)
        const newPassword = faker.internet.password()
        const userUpdated = await updateProfileService.execute({
            user_id: user.id,
            name: 'Jorge',
            email: 'jorge@gmail.com',
            old_password: userData.password,
            password: newPassword
        })

        const hashPassword = await hash.hash(newPassword)

        expect(userUpdated.password).toBe(hashPassword)
    })

    it('Should not be able to change password when old password is incorrect.', async () => {
        const user = await createUserRepository.execute(userData)
        const newPassword = faker.internet.password()
        const userUpdated = updateProfileService.execute({
            user_id: user.id,
            name: 'Jorge',
            email: 'jorge@gmail.com',
            old_password: 'wrong_password',
            password: newPassword
        })

        await expect(userUpdated).rejects.toBeInstanceOf(AppError)
    })
})
