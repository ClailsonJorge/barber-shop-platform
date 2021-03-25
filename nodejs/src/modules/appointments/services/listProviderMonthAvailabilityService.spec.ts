import ListProviderMonthAvailabilityService from './listProviderMonthAvailabilityService'
import FakerAppointmentsRepository from '../repositories/fakes/fakerAppointmentRepository'

let fakerAppointmentsRepository: FakerAppointmentsRepository
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService

const fillAppointmentsOneDay = async (
    repository: FakerAppointmentsRepository,
    count: number
): Promise<void> => {
    await repository.create({
        provider_id: 'user_id',
        user_id: 'user_id',
        date: new Date(2021, 4, 20, 8 + count, 0, 0)
    })

    if (count < 9) {
        await fillAppointmentsOneDay(repository, count + 1)
    }
}

describe('ListProviderMonthAvailability', () => {
    beforeEach(() => {
        fakerAppointmentsRepository = new FakerAppointmentsRepository()
        listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
            fakerAppointmentsRepository
        )
    })
    it('Should be able to list the month availability from Provider', async () => {
        await fillAppointmentsOneDay(fakerAppointmentsRepository, 0)

        await fakerAppointmentsRepository.create({
            provider_id: 'user_id',
            user_id: 'user_id',
            date: new Date(2021, 4, 21, 8, 0, 0)
        })

        const availability = await listProviderMonthAvailabilityService.execute(
            {
                provider_id: 'user_id',
                year: 2021,
                month: 5
            }
        )

        expect(availability).toEqual(
            expect.arrayContaining([
                {
                    day: 20,
                    available: false
                },
                {
                    day: 21,
                    available: true
                },
                {
                    day: 21,
                    available: true
                },
                {
                    day: 19,
                    available: true
                }
            ])
        )
    })
})
