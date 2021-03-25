import ListProviderDayAvailabilityService from './listProviderDayAvailabilityService'
import FakerAppointmentsRepository from '../repositories/fakes/fakerAppointmentRepository'

let fakerAppointmentsRepository: FakerAppointmentsRepository
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService

const makeAppointment = async (
    repository: FakerAppointmentsRepository,
    addHour = 0
): Promise<void> => {
    await repository.create({
        provider_id: 'user_id',
        user_id: 'user_id',
        date: new Date(2021, 4, 25, 8 + addHour, 0, 0)
    })
}

describe('ListProviderDayAvailability', () => {
    beforeEach(() => {
        fakerAppointmentsRepository = new FakerAppointmentsRepository()
        listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
            fakerAppointmentsRepository
        )
    })

    it('Should be able to list the day availability from Provider', async () => {
        await makeAppointment(fakerAppointmentsRepository, 1)
        await makeAppointment(fakerAppointmentsRepository, 2)

        jest.spyOn(Date, 'now').mockImplementationOnce(() =>
            new Date(2021, 4, 25, 10).getTime()
        )

        const availability = await listProviderDayAvailabilityService.execute({
            provider_id: 'user_id',
            year: 2021,
            month: 5,
            day: 25
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
                    available: false
                },
                {
                    hour: 11,
                    available: true
                }
            ])
        )
    })
})
