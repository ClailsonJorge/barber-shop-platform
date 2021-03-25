import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import { getHours, getTime } from 'date-fns'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IExecuteParams {
    provider_id: string
    day: number
    month: number
    year: number
}

type IResponse = Array<{
    hour: number
    available: boolean
}>

@injectable()
export default class ListProviderDayAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ) {}

    public async execute({
        provider_id,
        day,
        month,
        year
    }: IExecuteParams): Promise<IResponse> {
        const startHourInWorkDay = 8
        const quantityHourOfAppointmentForDay = 10

        const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
            {
                provider_id,
                day,
                month,
                year
            }
        )

        const eachDayArray = Array.from(
            {
                length: quantityHourOfAppointmentForDay
            },
            (_, index) => index + startHourInWorkDay
        )

        const availability = eachDayArray.map((hour) => {
            const appointmentsHour = appointments.find((appointment) => {
                return getHours(appointment.date) === hour
            })

            return {
                hour,
                available: !appointmentsHour
            }
        })

        return availability
    }
}
