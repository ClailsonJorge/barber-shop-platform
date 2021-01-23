import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import Appointment from '../models/appointment'
import AppointmentsRepository from '../repsitories/appointmentsRepository'
import AppError from '../errors/appError'

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
