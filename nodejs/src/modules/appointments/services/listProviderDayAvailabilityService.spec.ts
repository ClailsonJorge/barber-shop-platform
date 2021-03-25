import ListProviderDayAvailabilityService from './listProviderDayAvailabilityService'
import FakerAppointmentsRepository from '../repositories/fakes/fakerAppointmentRepository'

let fakerAppointmentsRepository: FakerAppointmentsRepository
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService

describe('ListProviderDayAvailability', () => {
    beforeEach(() => {
        fakerAppointmentsRepository = new FakerAppointmentsRepository()
        listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
            fakerAppointmentsRepository
        )
    })

    it('Should be able to list the day availability from Provider', async () => {
        await fakerAppointmentsRepository.create({
            provider_id: 'user_id',
            date: new Date(2021, 4, 21, 8, 0, 0)
        })

        await fakerAppointmentsRepository.create({
            provider_id: 'user_id',
            date: new Date(2021, 4, 21, 9, 0, 0)
        })

        const availability = await listProviderDayAvailabilityService.execute({
            provider_id: 'user_id',
            year: 2021,
            month: 5,
            day: 21
        })

        expect(availability).toEqual(
            expect.arrayContaining([
                {
                    hour: 8,
                    available: false
                },
                {
                    hour: 9,
                    available: false
                },
                {
                    hour: 10,
                    available: true
                }
            ])
        )
    })
})
