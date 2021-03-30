import FakerAppointmentsRepository from '../repositories/fakes/fakerAppointmentRepository'
import ListProviderAppointmentsService from './listProviderAppointmentsServices'

let fakeAppointmentsRepository: FakerAppointmentsRepository
let listProviderAppointments: ListProviderAppointmentsService

describe('ListProviderAppointments', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakerAppointmentsRepository()
        listProviderAppointments = new ListProviderAppointmentsService(
            fakeAppointmentsRepository
        )
    })

    it('Should be able to return all appointments into a day', async () => {
        const appointment1 = await fakeAppointmentsRepository.create({
            provider_id: 'provider_id',
            date: new Date(2021, 3, 29, 14),
            user_id: 'user_id'
        })

        const appointment2 = await fakeAppointmentsRepository.create({
            provider_id: 'provider_id',
            date: new Date(2021, 3, 29, 14),
            user_id: 'user_id'
        })

        const listAppointmentsDay = await listProviderAppointments.execute({
            provider_id: 'provider_id',
            day: 29,
            month: 4,
            year: 2021
        })

        expect(listAppointmentsDay).toEqual([appointment1, appointment2])
    })
})
