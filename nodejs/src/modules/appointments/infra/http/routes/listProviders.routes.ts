import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated'
import ProvidersController from '../controllers/providersController'
import ProviderMonthAvailabilityController from '../controllers/providerMonthAvailabilityController'
import ProviderDayAvailabilityController from '../controllers/providerDayAvailabilityController'

const listProvidersRouter = Router()
const providersController = new ProvidersController()
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController()
const providerDayAvailabilityController = new ProviderDayAvailabilityController()

listProvidersRouter.use(ensureAuthenticated)

listProvidersRouter.get('/', providersController.index)
listProvidersRouter.get(
    '/:provider_id/month-availability',
    celebrate({
        [Segments.PARAMS]: {
            provider_id: Joi.string().uuid().required()
        }
    }),
    providerMonthAvailabilityController.index
)
listProvidersRouter.get(
    '/:provider_id/day-availability',
    providerDayAvailabilityController.index
)

export default listProvidersRouter
