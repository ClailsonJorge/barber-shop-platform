import ICreateAppointmentDto from '../dtos/ICreateAppointmentsDto'
import IFindAllInDayfromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO'
import IFindAllInMonthfromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO'
import Appointment from '../infra/typeorm/entities/appointment'

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDto): Promise<Appointment | undefined>
    findByDate(
        date: Date,
        provider_id: string
    ): Promise<Appointment | undefined>
    findAllInMonthFromProvider(
        data: IFindAllInMonthfromProviderDTO
    ): Promise<Appointment[]>
    findAllInDayFromProvider(
        data: IFindAllInDayfromProviderDTO
    ): Promise<Appointment[]>
}
