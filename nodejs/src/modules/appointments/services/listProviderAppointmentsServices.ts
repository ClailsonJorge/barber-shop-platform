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
        const cacheData = await this.cacheProvider.recover('asa')
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
            {
                provider_id,
                day,
                month,
                year
            }
        )

        return appointments
    }
}
