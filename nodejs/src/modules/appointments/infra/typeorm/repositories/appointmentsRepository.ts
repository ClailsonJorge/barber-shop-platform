import { getRepository, Repository } from 'typeorm'
import Appointment from '@modules/appointments/infra/typeorm/entities/appointment'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentsDto'

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
        provider_id
    }: ICreateAppointmentDto): Promise<Appointment | undefined> {
        const appointment = this.ormRepository.create({
            provider_id,
            date
        })

        await this.ormRepository.save(appointment)

        return appointment
    }
}

export default AppointmentsRepository
