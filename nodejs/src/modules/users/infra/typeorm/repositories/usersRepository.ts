import { getRepository, Repository } from 'typeorm'
import ICreateUserDto from '@modules/users/dtos/ICreateUserDto'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import User from '../entities/user'

class UsersRepository implements IUsersRepository {
    usersRepository: Repository<User>

    constructor() {
        this.usersRepository = getRepository(User)
    }

    public async create({
        name,
        email,
        password
    }: ICreateUserDto): Promise<User> {
        const userRepository = this.usersRepository.create({
            name,
            email,
            password
        })
        await this.save(userRepository)
        return userRepository
    }

    public async save(user: User): Promise<User> {
        return this.usersRepository.save(user)
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({
            where: { email }
        })
    }

    public async findById(id: string): Promise<User | undefined> {
        return this.usersRepository.findOne(id)
    }
}

export default UsersRepository
