import ICreateUserDto from '@modules/users/dtos/ICreateUserDto'
import IFindProvidersDTO from '../dtos/IFindProvidersDTO'
import User from '../infra/typeorm/entities/user'

export default interface IUsersRepository {
    findAllProviders({ except_user_id }: IFindProvidersDTO): Promise<User[]>
    create(data: ICreateUserDto): Promise<User | undefined>
    save(user: User): Promise<User | undefined>
    findByEmail(email: string): Promise<User | undefined>
    findById(id: string): Promise<User | undefined>
}
