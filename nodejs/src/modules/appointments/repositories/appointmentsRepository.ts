import { EntityRepository, Repository } from 'typeorm'
import Appointment from '../models/appointment'

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    public async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointmentsEquals = await this.findOne({
            where: { date }
        })
        return findAppointmentsEquals || null
    }
}
export default AppointmentsRepository
