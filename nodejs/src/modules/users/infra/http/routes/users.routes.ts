import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import multer from 'multer'
import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated'
import uploadonfig from '@config/upload'
import UsersController from '../controllers/UsersController'
import UserAvatarUpdateController from '../controllers/UserAvatarUpdateController'

const usersRouter = Router()
const upload = multer(uploadonfig)
const usersController = new UsersController()
const UserAvatarUpdate = new UserAvatarUpdateController()

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),
    usersController.create
)

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    UserAvatarUpdate.create
)
export default usersRouter
