import { startOfHour, isBefore, getHours, format } from 'date-fns'
import { inject, injectable } from 'tsyringe'
import Appointment from '@modules/appointments/infra/typeorm/entities/appointment'
import AppError from '@shared/errors/appError'
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import ICacheProvider from '@shared/container/providers/cacheProvider/models/ICacheProvider'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IExecuteParams {
    date: Date
    provider_id: string
    user_id: string
}

@injectable()
export default class CreateAppointment {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
    ) {}

    async execute({
        date,
        user_id,
        provider_id
    }: IExecuteParams): Promise<Appointment | undefined> {
        const parseDate = startOfHour(date)

        if (isBefore(parseDate, Date.now())) {
            throw new AppError("you can't create an appointment on past date.")
        }

        if (getHours(parseDate) < 8 || getHours(parseDate) > 17) {
            throw new AppError(
                'Your appointment should be between 8am and 5pmyarn .'
            )
        }

        if (user_id === provider_id) {
            throw new AppError(
                "you can't create an appointment for yourself with you."
            )
        }

        const findAppointmentsEquals = await this.appointmentsRepository.findByDate(
            parseDate,
            provider_id
        )

        if (findAppointmentsEquals) {
            throw new AppError('This appointments is already booked', 401)
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: parseDate
        })

        const dateFormated = format(parseDate, "dd/MM/yyyy 'às' HH:mm'h'")

        this.notificationsRepository.create({
            recipient_id: provider_id,
            content: `Novo agendamento para o dia ${dateFormated}`
        })

        await this.cacheProvider.invalidate(
            `provider-appointments:${format(parseDate, 'yyyy-M-d')}`
        )

        return appointment
    }
}
