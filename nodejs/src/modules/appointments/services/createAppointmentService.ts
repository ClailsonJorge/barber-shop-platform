import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import Appointment from '@modules/appointments/infra/typeorm/entities/appointment'
import AppError from '@shared/errors/appError'
import AppointmentsRepository from '../repositories/appointmentsRepository'

interface ExecuteParams {
    date: Date
    provider_id: string
}

export default class CreateAppointment {
    async execute({ date, provider_id }: ExecuteParams): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository
        )
        const parseDate = startOfHour(date)
        const findAppointmentsEquals = await appointmentsRepository.findByDate(
            parseDate
        )

        if (findAppointmentsEquals) {
            throw new AppError('This appointments is already booked', 401)
        }
        const appointment = appointmentsRepository.create({
            provider_id,
            date: parseDate
        })
        await appointmentsRepository.save(appointment)
        return appointment
    }
}
