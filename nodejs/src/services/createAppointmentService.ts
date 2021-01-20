import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import Appointment from '../models/appointment'
import AppointmentsRepository from '../repsitories/appointmentsRepository'

interface ExecuteParams {
    date: Date
    provider: string
}

export default class CreateAppointment {
    async execute({ date, provider }: ExecuteParams): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository
        )
        const parseDate = startOfHour(date)
        const findAppointmentsEquals = await appointmentsRepository.findByDate(
            parseDate
        )

        if (findAppointmentsEquals) {
            throw Error('This appointments is already booked')
        }
        const appointment = appointmentsRepository.create({
            provider,
            date: parseDate
        })
        await appointmentsRepository.save(appointment)
        return appointment
    }
}
