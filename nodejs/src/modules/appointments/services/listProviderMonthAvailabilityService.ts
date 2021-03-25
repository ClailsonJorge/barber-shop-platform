import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import { getDaysInMonth, getDate } from 'date-fns'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IExecuteParams {
    provider_id: string
    month: number
    year: number
}

type IResponse = Array<{
    day: number
    available: boolean
}>

@injectable()
export default class ListProviderMonthAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ) {}

    public async execute({
        provider_id,
        month,
        year
    }: IExecuteParams): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
            {
                provider_id,
                month,
                year
            }
        )

        const numberOfDaysinMonth = getDaysInMonth(new Date(year, month - 1))

        const eachDayArray = Array.from(
            {
                length: numberOfDaysinMonth
            },
            (_, index) => index + 1
        )

        const availability = eachDayArray.map((day) => {
            const appointmentsDay = appointments.filter((appointment) => {
                return getDate(appointment.date) === day
            })

            return {
                day,
                available: appointmentsDay.length < 10
            }
        })

        return availability
    }
}