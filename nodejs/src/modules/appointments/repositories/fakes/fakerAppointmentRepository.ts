import { v4 as uuid } from 'uuid'
import Appointment from '@modules/appointments/infra/typeorm/entities/appointment'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentsDto'

class FakerAppointmentsRepository implements IAppointmentsRepository {
    private appointmentRepository: Appointment[] = []

    cont = 0

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointmentsEquals = this.appointmentRepository.find(
            (appointment) => String(appointment.date) === String(date)
        )

        return findAppointmentsEquals
    }

    public async create({
        date,
        provider_id
    }: ICreateAppointmentDto): Promise<Appointment | undefined> {
        const appointment = new Appointment()

        appointment.id = uuid()
        appointment.date = date
        appointment.provider_id = provider_id

        this.appointmentRepository.push(appointment)

        return appointment
    }
}

export default FakerAppointmentsRepository