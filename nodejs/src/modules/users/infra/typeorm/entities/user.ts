import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm'

import { Exclude, Expose } from 'class-transformer'

@Entity('user')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    @Exclude()
    password: string

    @Column()
    avatar: string

    @Expose({ name: 'avatar_url' })
    getavatarUrl(): string | null {
        return this.avatar
            ? `${process.env.APP_API_URL}/files/${this.avatar}`
            : null
    }

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

export default User
