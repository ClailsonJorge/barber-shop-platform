import { hash } from 'bcrypt'
import { getRepository } from 'typeorm'
import User from '../models/user'

interface ExecuteParams {
    name: string
    email: string
    password: string
}

interface UserReturn extends Omit<User, 'password'> {
    password?: string
}

class CreateUserService {
    public async execute({
        name,
        email,
        password
    }: ExecuteParams): Promise<UserReturn> {
        const userModel = getRepository(User)

        const checkEmailExist = await userModel.findOne({
            where: { email }
        })
        if (checkEmailExist) {
            throw Error('This Email Address already registed.')
        }
        const passwordHash = await hash(password, 8)
        const user: UserReturn = userModel.create({
            name,
            email,
            password: passwordHash
        })
        await userModel.save(user)
        delete user.password
        return user
    }
}

export default CreateUserService
