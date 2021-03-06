import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import ForgotPasswordController from '../controllers/forgotPasswordController'
import ResetPasswordController from '../controllers/resetPasswordController'

const passwordRouter = Router()
const forgotPasswordController = new ForgotPasswordController()
const resetPasswordController = new ResetPasswordController()

passwordRouter.post(
    '/forgot',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required()
        }
    }),
    forgotPasswordController.create
)
passwordRouter.post(
    '/reset',
    celebrate({
        [Segments.BODY]: {
            password: Joi.string().required(),
            password_confirmation: Joi.string()
                .valid(Joi.ref('password'))
                .required(),
            token: Joi.string().uuid().required()
        }
    }),
    resetPasswordController.create
)

export default passwordRouter
