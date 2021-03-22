import { Router } from 'express'
import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated'
import ProfileController from '../controllers/profileController'

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.use(ensureAuthenticated)

profileRouter.get('/', profileController.show)

profileRouter.put('/', profileController.update)

export default profileRouter
