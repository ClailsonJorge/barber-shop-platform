import ICacheProvider from '@shared/container/providers/cacheProvider/models/ICacheProvider'
import { inject, injectable } from 'tsyringe'
import Appointment from '../infra/typeorm/entities/appointment'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IExecuteParams {
    provider_id: string
    day: number
    month: number
    year: number
}

@injectable()
export default class ListProviderAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
    ) {}

    public async execute({
        provider_id,
        day,
        month,
        year
    }: IExecuteParams): Promise<Appointment[]> {
        const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`
        let appointments = await this.cacheProvider.recover<Appointment[]>(
            cacheKey
        )

        if (!appointments) {
            appointments = await this.appointmentsRepository.findAllInDayFromProvider(
                {
                    provider_id,
                    day,
                    month,
                    year
                }
            )
            console.log('pegou do banco')
            await this.cacheProvider.save(cacheKey, appointments)
        }

        return appointments
    }
}
