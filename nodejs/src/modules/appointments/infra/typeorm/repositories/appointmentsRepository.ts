import { getRepository, Repository, Raw } from 'typeorm'
import Appointment from '@modules/appointments/infra/typeorm/entities/appointment'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentsDto'
import IFindAllInMonthfromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayfromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO'

class AppointmentsRepository implements IAppointmentsRepository {
    ormRepository: Repository<Appointment>

    constructor() {
        this.ormRepository = getRepository(Appointment)
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointmentsEquals = await this.ormRepository.findOne({
            where: { date }
        })
        return findAppointmentsEquals
    }

    public async create({
        date,
        user_id,
        provider_id
    }: ICreateAppointmentDto): Promise<Appointment | undefined> {
        const appointment = this.ormRepository.create({
            provider_id,
            user_id,
            date
        })

        await this.ormRepository.save(appointment)

        return appointment
    }

    public async findAllInMonthFromProvider({
        provider_id,
        month,
        year
    }: IFindAllInMonthfromProviderDTO): Promise<Appointment[]> {
        const parsedMonth = String(month).padStart(2, '0')
        const findAppointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    (dateFieldName) =>
                        `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}`
                )
            }
        })

        return findAppointments
    }

    public async findAllInDayFromProvider({
        provider_id,
        day,
        month,
        year
    }: IFindAllInDayfromProviderDTO): Promise<Appointment[]> {
        const parsedMonth = String(month).padStart(2, '0')
        const parsedDay = String(day).padStart(2, '0')

        const findAppointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    (dateFieldName) =>
                        `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}`
                )
            }
        })

        return findAppointments
    }
}

export default AppointmentsRepository
