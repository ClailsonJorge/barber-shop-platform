import { Router } from 'express'
import ForgotPasswordController from '../controllers/forgotPasswordController'
import ResetPasswordController from '../controllers/resetPasswordController'

const passwordRouter = Router()
const forgotPasswordController = new ForgotPasswordController()
const resetPasswordController = new ResetPasswordController()

passwordRouter.post('/forgot', forgotPasswordController.create)
passwordRouter.post('/reset', resetPasswordController.create)

export default passwordRouter
