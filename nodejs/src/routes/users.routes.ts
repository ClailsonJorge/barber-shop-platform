import { Router } from 'express'
import multer from 'multer'
import { CreateUserService } from '../services'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import uploadonfig from '../config/upload'
import UpdateUserAvatarService from '../services/updateUserAvatarService'

const usersRouter = Router()
const upload = multer(uploadonfig)

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body
    const createUser = new CreateUserService()
    const user = await createUser.execute({ name, email, password })

    return response.json(user)
})

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        const updateUserAvatar = new UpdateUserAvatarService()
        const user = await updateUserAvatar.execute({
            user_id: request.user?.id || '1',
            avatarFileName: request.file.filename
        })

        return response.json(user)
    }
)
export default usersRouter
