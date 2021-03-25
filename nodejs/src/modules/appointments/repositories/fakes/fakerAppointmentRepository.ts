import { v4 as uuid } from 'uuid'
import Appointment from '@modules/appointments/infra/typeorm/entities/appointment'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentsDto'
import IFindAllInMonthfromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'
import { getMonth, getYear, getDate } from 'date-fns'
import IFindAllInDayfromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO'

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
        user_id,
        provider_id
    }: ICreateAppointmentDto): Promise<Appointment | undefined> {
        const appointment = new Appointment()

        appointment.id = uuid()
        appointment.date = date
        appointment.provider_id = provider_id

        this.appointmentRepository.push(appointment)

        return appointment
    }

    public async findAllInMonthFromProvider({
        provider_id,
        month,
        year
    }: IFindAllInMonthfromProviderDTO): Promise<Appointment[]> {
        const findAppointments = this.appointmentRepository.filter(
            (appointment) =>
                appointment.provider_id === provider_id &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year
        )

        return findAppointments
    }

    public async findAllInDayFromProvider({
        provider_id,
        day,
        month,
        year
    }: IFindAllInDayfromProviderDTO): Promise<Appointment[]> {
        const findAppointments = this.appointmentRepository.filter(
            (appointment) =>
                appointment.provider_id === provider_id &&
                getDate(appointment.date) === day &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year
        )

        return findAppointments
    }
}

export default FakerAppointmentsRepository
