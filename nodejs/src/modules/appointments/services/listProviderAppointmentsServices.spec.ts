import FakeCacheProvider from '@shared/container/providers/cacheProvider/fake/fakerCacheProvider'
import FakerAppointmentsRepository from '../repositories/fakes/fakerAppointmentRepository'
import ListProviderAppointmentsService from './listProviderAppointmentsServices'

let fakeAppointmentsRepository: FakerAppointmentsRepository
let fakeCacheProvider: FakeCacheProvider
let listProviderAppointments: ListProviderAppointmentsService

describe('ListProviderAppointments', () => {
    beforeEach(() => {
        fakeCacheProvider = new FakeCacheProvider()
        fakeAppointmentsRepository = new FakerAppointmentsRepository()
        listProviderAppointments = new ListProviderAppointmentsService(
            fakeAppointmentsRepository,
            fakeCacheProvider
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
