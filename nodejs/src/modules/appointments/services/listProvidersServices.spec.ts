import faker from 'faker'
import FakerBCriptHashProvider from '@modules/users/providers/hashProvider/fakes/fakerBCriptHashProvider'
import FakerUsersRepository from '@modules/users/repositories/fakes/fakerUsersRepository'
import CreateUserService from '@modules/users/services/createUserService'
import FakeCacheProvider from '@shared/container/providers/cacheProvider/fake/fakerCacheProvider'
import ListProvidersService from './listProvidersServices'

let fakerUsersRepository: FakerUsersRepository
let fakeCacheProvider: FakeCacheProvider
let hash: FakerBCriptHashProvider
let createUser: CreateUserService
let listProviders: ListProvidersService

const makeUsers = () => ({
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
})

describe('ListProviders', () => {
    beforeEach(() => {
        fakerUsersRepository = new FakerUsersRepository()
        fakeCacheProvider = new FakeCacheProvider()
        hash = new FakerBCriptHashProvider()
        createUser = new CreateUserService(
            fakerUsersRepository,
            hash,
            fakeCacheProvider
        )
        listProviders = new ListProvidersService(
            fakerUsersRepository,
            fakeCacheProvider
        )
    })
    it('Should be able to list the Providers', async () => {
        const user1 = await createUser.execute(makeUsers())
        const user2 = await createUser.execute(makeUsers())
        const user3 = await createUser.execute(makeUsers())

        const users = await listProviders.execute({ user_id: user3.id })

        expect(users).toEqual([user1, user2])
    })
})
