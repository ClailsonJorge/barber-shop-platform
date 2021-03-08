import { Router } from 'express'
import multer from 'multer'
import CreateUserService from '@modules/users/services/createUserService'
import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated'
import uploadonfig from '@config/upload'
import UpdateUserAvatarService from '@modules/users/services/updateUserAvatarService'
import UsersRepository from '../../typeorm/repositories/usersRepository'

const usersRouter = Router()
const upload = multer(uploadonfig)

usersRouter.post('/', async (request, response) => {
    const userRepository = new UsersRepository()
    const { name, email, password } = request.body
    const createUser = new CreateUserService(userRepository)
    const user = await createUser.execute({ name, email, password })

    return response.json(user)
})

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        const userRepository = new UsersRepository()
        const updateUserAvatar = new UpdateUserAvatarService(userRepository)
        const user = await updateUserAvatar.execute({
            user_id: request.user?.id || '1',
            avatarFileName: request.file.filename
        })

        return response.json(user)
    }
)
export default usersRouter
