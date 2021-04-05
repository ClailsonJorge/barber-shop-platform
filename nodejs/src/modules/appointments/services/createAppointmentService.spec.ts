import faker from 'faker'
import AppError from '@shared/errors/appError'
import FakeNotificationsRepository from '@modules/notifications/repositories/fake/fakeNotificationsRepository'
import FakeCacheProvider from '@shared/container/providers/cacheProvider/fake/fakerCacheProvider'
import FakerAppointmentsRepository from '../repositories/fakes/fakerAppointmentRepository'
import CreateAppointment from './createAppointmentService'

let fakerRepository: FakerAppointmentsRepository
let fakerNotificationsRepository: FakeNotificationsRepository
let fakeCacheProvider: FakeCacheProvider
let createAppointment: CreateAppointment

describe('Create Appointments', () => {
    beforeEach(() => {
        fakerRepository = new FakerAppointmentsRepository()
        fakeCacheProvider = new FakeCacheProvider()
        fakerNotificationsRepository = new FakeNotificationsRepository()
        createAppointment = new CreateAppointment(
            fakerRepository,
            fakerNotificationsRepository,
            fakeCacheProvider
        )
    })

    it('Should be able to create a new appointment', async () => {
        const appointmentData = {
            date: new Date(2021, 3, 25, 11),
            user_id: faker.random.uuid(),
            provider_id: faker.random.uuid()
        }

        jest.spyOn(Date, 'now').mockImplementationOnce(() =>
            new Date(2021, 3, 25, 10).getTime()
        )

        const appointment = await createAppointment.execute(appointmentData)

        expect(appointment).toHaveProperty('id')
        expect(appointment?.provider_id).toBe(appointmentData.provider_id)
    })

    it('Should be not able to create duplicate appointment', async () => {
        const appointmentData = {
            date: new Date(2021, 3, 25, 11),
            user_id: faker.random.uuid(),
            provider_id: faker.random.uuid()
        }

        jest.spyOn(Date, 'now').mockImplementation(() =>
            new Date(2021, 3, 25, 10).getTime()
        )

        await createAppointment.execute(appointmentData)

        await expect(
            createAppointment.execute(appointmentData)
        ).rejects.toBeInstanceOf(AppError)
    })

    it('Should not be able to create an appointment on a past date', async () => {
        const appointmentData = {
            date: new Date(2021, 3, 25, 8),
            user_id: faker.random.uuid(),
            provider_id: faker.random.uuid()
        }

        jest.spyOn(Date, 'now').mockImplementationOnce(() =>
            new Date(2021, 3, 26, 10).getTime()
        )

        const newAppointmentOnPast = createAppointment.execute(appointmentData)

        await expect(newAppointmentOnPast).rejects.toBeInstanceOf(AppError)
    })

    it('Should not be able to create an appointment with same provider Id', async () => {
        const appointmentData = {
            date: new Date(2021, 3, 26, 11),
            user_id: '123123',
            provider_id: '123123'
        }

        jest.spyOn(Date, 'now').mockImplementationOnce(() =>
            new Date(2021, 3, 26, 10).getTime()
        )

        const newAppointmentSameId = createAppointment.execute(appointmentData)

        await expect(newAppointmentSameId).rejects.toBeInstanceOf(AppError)
    })

    it('Should not be able to create an appointment before 8pm or after 5pm', async () => {
        const appointmentDataBefore = {
            date: new Date(2021, 3, 27, 7),
            user_id: '123456',
            provider_id: '123123'
        }

        const appointmentDataAfter = {
            date: new Date(2021, 3, 27, 18),
            user_id: '123456',
            provider_id: '123123'
        }

        jest.spyOn(Date, 'now').mockImplementation(() =>
            new Date(2021, 3, 26, 10).getTime()
        )

        const newAppointmentBefore = createAppointment.execute(
            appointmentDataBefore
        )
        const newAppointmentAfter = createAppointment.execute(
            appointmentDataAfter
        )

        await expect(newAppointmentBefore).rejects.toBeInstanceOf(AppError)
        await expect(newAppointmentAfter).rejects.toBeInstanceOf(AppError)
    })
})
