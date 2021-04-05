import faker from 'faker'
import AppError from '@shared/errors/appError'
import FakeCacheProvider from '@shared/container/providers/cacheProvider/fake/fakerCacheProvider'
import FakerUsersRepository from '../repositories/fakes/fakerUsersRepository'
import FakerHashProvider from '../providers/hashProvider/fakes/fakerBCriptHashProvider'
import CreateUserService from './createUserService'
import ShowProfileService from './showProfileService'
import IUserData from './utils/models/IUserData'

let fakerUsersRepository: FakerUsersRepository
let fakeCacheProvider: FakeCacheProvider
let hash: FakerHashProvider
let createUserRepository: CreateUserService
let showProfileService: ShowProfileService
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
        showProfileService = new ShowProfileService(fakerUsersRepository)
        userData = {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }
    })

    it('Should be able to show the provider.', async () => {
        const createUser = await createUserRepository.execute(userData)
        const user = await showProfileService.execute(createUser.id)

        expect(user.name).toBe(userData.name)
        expect(user.email).toBe(userData.email)
    })

    it('Should not be able to show the provider when user non-exist.', async () => {
        const user = showProfileService.execute('wrong-user-id')

        await expect(user).rejects.toBeInstanceOf(AppError)
    })
})
