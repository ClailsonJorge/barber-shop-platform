import { startOfHour } from 'date-fns'
import Appointment from '@modules/appointments/infra/typeorm/entities/appointment'
import AppError from '@shared/errors/appError'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IExecuteParams {
    date: Date
    provider_id: string
}

export default class CreateAppointment {
    constructor(private appointmentsRepository: IAppointmentsRepository) {}

    async execute({
        date,
        provider_id
    }: IExecuteParams): Promise<Appointment | undefined> {
        const parseDate = startOfHour(date)
        const findAppointmentsEquals = await this.appointmentsRepository.findByDate(
            parseDate
        )

        if (findAppointmentsEquals) {
            throw new AppError('This appointments is already booked', 401)
        }
        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: parseDate
        })

        return appointment
    }
}
