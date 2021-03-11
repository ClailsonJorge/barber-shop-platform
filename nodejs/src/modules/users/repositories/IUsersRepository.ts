import ICreateUserDto from '@modules/users/dtos/ICreateUserDto'
import User from '../infra/typeorm/entities/user'

export default interface IUsersRepository {
    create(data: ICreateUserDto): Promise<User | undefined>
    save(user: User): Promise<User | undefined>
    findByEmail(email: string): Promise<User | undefined>
    findById(id: string): Promise<User | undefined>
}
