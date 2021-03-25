import ListProviderDayAvailabilityService from './listProviderDayAvailabilityService'
import FakerAppointmentsRepository from '../repositories/fakes/fakerAppointmentRepository'

let fakerAppointmentsRepository: FakerAppointmentsRepository
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService

const makeAppointment = async (
    repository: FakerAppointmentsRepository,
    addHour = 0
): Promise<void> => {
    const currentDate = new Date(Date.now())
    await repository.create({
        provider_id: 'user_id',
        date: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            currentDate.getHours() + addHour,
            0,
            0
        )
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
        const currentDate = new Date(Date.now())
        await makeAppointment(fakerAppointmentsRepository, 1)
        await makeAppointment(fakerAppointmentsRepository, 2)

        const availability = await listProviderDayAvailabilityService.execute({
            provider_id: 'user_id',
            year: currentDate.getFullYear(),
            month: currentDate.getMonth() + 1,
            day: currentDate.getDate()
        })

        expect(availability).toEqual(
            expect.arrayContaining([
                {
                    hour: currentDate.getHours(),
                    available: false
                },
                {
                    hour: currentDate.getHours() + 1,
                    available: false
                },
                {
                    hour: currentDate.getHours() + 2,
                    available: false
                },
                {
                    hour: currentDate.getHours() + 3,
                    available: true
                }
            ])
        )
    })
})
