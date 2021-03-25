import ICreateAppointmentDto from '../dtos/ICreateAppointmentsDto'
import IFindAllInfromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO'
import Appointment from '../infra/typeorm/entities/appointment'

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDto): Promise<Appointment | undefined>
    findByDate(date: Date): Promise<Appointment | undefined>
    findAllInMonthFromProvider(
        data: IFindAllInfromProviderDTO
    ): Promise<Appointment[]>
}
