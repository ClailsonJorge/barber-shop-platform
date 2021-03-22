import { v4 as uuid } from 'uuid'
import ICreateUserDto from '@modules/users/dtos/ICreateUserDto'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import User from '@modules/users/infra/typeorm/entities/user'

class FakerUsersRepository implements IUsersRepository {
    private usersRepository: User[] = []

    public async create({
        name,
        email,
        password
    }: ICreateUserDto): Promise<User | undefined> {
        const userRepository = new User()

        userRepository.id = uuid()
        userRepository.name = name
        userRepository.email = email
        userRepository.password = password

        this.usersRepository.push(userRepository)

        await this.save(userRepository)

        return userRepository
    }

    public async save(user: User): Promise<User | undefined> {
        const userIndex = this.usersRepository.findIndex(
            (userRepository) => userRepository.id === user.id
        )

        this.usersRepository[userIndex] = user

        return user
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.find((user) => user.email === email)
    }

    public async findById(id: string): Promise<User | undefined> {
        return this.usersRepository.find((user) => user.id === id)
    }
}

export default FakerUsersRepository
