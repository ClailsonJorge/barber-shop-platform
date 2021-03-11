import AppError from '@shared/errors/appError'
import faker from 'faker'
import FakerDiskStorageProvider from '@shared/container/providers/diskStorage/fakes/fakerDiskStorageProvider'
import FakerBCriptHashProvider from '../providers/hashProvider/fakes/fakerBCriptHashProvider'
import FakerUsersRepository from '../repositories/fakes/fakerUsersRepository'
import CreateUserService from './createUserService'
import UpdateUserAvatarService from './updateUserAvatarService'

describe('Update user avatar', () => {
    it('Should be able to update avatar', async () => {
        const fakerUsersRepository = new FakerUsersRepository()
        const fakerBCriptHashProvider = new FakerBCriptHashProvider()
        const diskStorage = new FakerDiskStorageProvider()
        const createUserService = new CreateUserService(
            fakerUsersRepository,
            fakerBCriptHashProvider
        )
        const updateUserAvatarFileName = new UpdateUserAvatarService(
            fakerUsersRepository,
            diskStorage
        )

        const userData = {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }

        const user = await createUserService.execute(userData)

        const avatarFileName = faker.internet.avatar()

        const userUpdated = await updateUserAvatarFileName.execute({
            user_id: user?.id ? user.id : '1',
            avatarFileName
        })

        expect(userUpdated.avatar).toEqual(avatarFileName)
    })

    it('Should not be able to update avatar when non exist user', async () => {
        const fakerUsersRepository = new FakerUsersRepository()
        const diskStorage = new FakerDiskStorageProvider()
        const updateUserAvatarFileName = new UpdateUserAvatarService(
            fakerUsersRepository,
            diskStorage
        )

        const avatarFileName = faker.internet.avatar()

        const userUpdated = updateUserAvatarFileName.execute({
            user_id: faker.random.uuid(),
            avatarFileName
        })

        expect(userUpdated).rejects.toBeInstanceOf(AppError)
    })

    it('Should be able to update avatar when already exist avatar', async () => {
        const fakerUsersRepository = new FakerUsersRepository()
        const fakerBCriptHashProvider = new FakerBCriptHashProvider()
        const diskStorage = new FakerDiskStorageProvider()
        const createUserService = new CreateUserService(
            fakerUsersRepository,
            fakerBCriptHashProvider
        )
        const updateUserAvatarFileName = new UpdateUserAvatarService(
            fakerUsersRepository,
            diskStorage
        )

        const userData = {
            name: faker.name.firstName(),
            email: `${name}.${faker.internet.email()}`,
            password: faker.internet.password()
        }

        const deleteFile = jest.spyOn(diskStorage, 'deleteFile')
        const user = await createUserService.execute(userData)

        const avatarFileName = faker.internet.avatar()
        const avatarFileNameFirst = faker.internet.avatar()

        await updateUserAvatarFileName.execute({
            user_id: user.id,
            avatarFileName: avatarFileNameFirst
        })

        const userUpdated = await updateUserAvatarFileName.execute({
            user_id: user.id,
            avatarFileName
        })

        expect(deleteFile).toHaveBeenCalledWith(avatarFileNameFirst)
        expect(userUpdated.avatar).toEqual(avatarFileName)
    })
})
