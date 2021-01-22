import { Router } from 'express'
import multer from 'multer'
import { CreateUserService } from '../services'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import uploadonfig from '../config/upload'

const usersRouter = Router()
const upload = multer(uploadonfig)

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
        return response.json({ ok: true })
    }
)
export default usersRouter
