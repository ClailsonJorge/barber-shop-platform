import { Router } from 'express'
import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated'
import ProvidersController from '../controllers/providersController'

const listProvidersRouter = Router()
const providersController = new ProvidersController()

listProvidersRouter.use(ensureAuthenticated)

listProvidersRouter.get('/', providersController.index)

export default listProvidersRouter
