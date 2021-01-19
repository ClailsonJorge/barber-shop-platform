import { isEqual } from 'date-fns'
import Appointment from '../models/appointment'

interface CreateParams {
    provider: string
    date: Date
}

class AppointmentRepository {
    private appointments: Appointment[]

    constructor() {
        this.appointments = []
    }

    public all(): Appointment[] {
        return this.appointments
    }

    public findByDate(date: Date): Appointment | null {
        const findAppointmentsEquals = this.appointments.find((appointment) =>
            isEqual(date, appointment.date)
        )
        return findAppointmentsEquals || null
    }

    public create({ provider, date }: CreateParams): Appointment {
        const appointment = new Appointment({ provider, date })
        this.appointments.push(appointment)
        return appointment
    }
}
export default AppointmentRepository
