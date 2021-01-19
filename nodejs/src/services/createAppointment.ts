import { startOfHour } from 'date-fns'
import Appointment from '../models/appointment'
import AppointmentRepository from '../repsitories/appointmentsRepository'

interface ExecuteParams {
    date: Date
    provider: string
}

export default class CreateAppointment {
    private appointments: AppointmentRepository

    constructor(appointments: AppointmentRepository) {
        this.appointments = appointments
    }

    execute({ date, provider }: ExecuteParams): Appointment {
        const parseDate = startOfHour(date)
        const findAppointmentsEquals = this.appointments.findByDate(parseDate)

        if (findAppointmentsEquals) {
            throw Error('This appointments is already booked')
        }
        const appointment = this.appointments.create({
            provider,
            date: parseDate
        })
        return appointment
    }
}
