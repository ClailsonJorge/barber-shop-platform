import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('appointment')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    provider: string

    @Column('time with time zone')
    date: Date
}

export default Appointment
