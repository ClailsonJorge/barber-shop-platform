import { hash } from 'bcrypt'
import AppError from '@shared/errors/appError'
import User from '../infra/typeorm/entities/user'
import ICreateUserDto from '../dtos/ICreateUserDto'
import IUsersRepository from '../infra/repositories/IUsersRepository'

interface IExecuteReturn extends Omit<User, 'password'> {
    password?: string
}

class CreateUserService {
    constructor(private userRepository: IUsersRepository) {}

    public async execute({
        name,
        email,
        password
    }: ICreateUserDto): Promise<IExecuteReturn | undefined> {
        const checkEmailExist = await this.userRepository.findByEmail(email)

        if (checkEmailExist) {
            throw new AppError('This Email Address already registed.', 401)
        }

        const passwordHash = await hash(password, 8)
        const user = await this.userRepository.create({
            name,
            email,
            password: passwordHash
        })

        return user
            ? {
                  name: user.name,
                  email: user.email,
                  id: user.id,
                  created_at: user.created_at,
                  updated_at: user.updated_at,
                  avatar: user.avatar
              }
            : undefined
    }
}

export default CreateUserService
