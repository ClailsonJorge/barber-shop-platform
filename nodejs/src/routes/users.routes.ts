import { Router } from 'express'
import multer from 'multer'
import { getRepository } from 'typeorm'
import path from 'path'
import fs from 'fs'
import { CreateUserService } from '../services'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import uploadonfig from '../config/upload'
import User from '../models/user'

const usersRouter = Router()
const upload = multer(uploadonfig)

interface ExecuteParams {
    user_id: string
    avatarFileName: string
}

interface UserResponse extends Omit<User, 'password'> {
    password?: string
}

class UpdateUserAvatarService {
    public async execute({
        user_id,
        avatarFileName
    }: ExecuteParams): Promise<UserResponse> {
        const usersRepository = getRepository(User)
        const user = await usersRepository.findOne(user_id)

        if (!user) {
            throw new Error('Avatar can not be updated.')
        }

        if (user.avatar) {
            const userAvatarPath = path.join(uploadonfig.directory, user.avatar)
            const avatarCheckExist = await fs.promises.stat(userAvatarPath)
            if (avatarCheckExist) {
                await fs.promises.unlink(userAvatarPath)
            }
        }
        user.avatar = avatarFileName
        await usersRepository.save(user)
        const userResponse: UserResponse = user
        delete userResponse.password
        return userResponse
    }
}

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body
        const createUser = new CreateUserService()
        const user = await createUser.execute({ name, email, password })

        return response.json(user)
    } catch (error) {
        return response.status(400).json({ message: error.message })
    }
})

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        try {
            const updateUserAvatar = new UpdateUserAvatarService()
            const user = await updateUserAvatar.execute({
                user_id: request.user?.id || '1',
                avatarFileName: request.file.filename
            })

            return response.json(user)
        } catch (error) {
            return response.status(400).json({ message: error.message })
        }
    }
)
export default usersRouter
