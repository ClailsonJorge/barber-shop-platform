import faker from 'faker'
import AppError from '@shared/errors/appError'
import FakerAppointmentsRepository from '../repositories/fakes/fakerAppointmentRepository'
import CreateAppointment from './createAppointmentService'

const makeSut = async () => {
    const appointmentData = {
        date: faker.date.recent(),
        provider_id: faker.random.uuid()
    }
    const fakerRepository = new FakerAppointmentsRepository()
    const createAppointment = new CreateAppointment(fakerRepository)
    const appointment = await createAppointment.execute(appointmentData)

    return { appointment, appointmentData, createAppointment }
}

describe('Create Appointments', () => {
    it('Should be able to create a new appointment', async () => {
        const { appointment, appointmentData } = await makeSut()
        expect(appointment).toHaveProperty('id')
        expect(appointment?.provider_id).toBe(appointmentData.provider_id)
    })

    it('Should be not able to create duplicate appointment', async () => {
        const { createAppointment, appointmentData } = await makeSut()
        expect(
            createAppointment.execute(appointmentData)
        ).rejects.toBeInstanceOf(AppError)
    })
})
