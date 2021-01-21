import { getRepository } from 'typeorm'
import User from '../models/user'

interface ExecuteParams {
    name: string
    email: string
    password: string
}

class CreateUserService {
    public async execute({
        name,
        email,
        password
    }: ExecuteParams): Promise<User> {
        const userModel = getRepository(User)

        const checkEmailExist = await userModel.findOne({
            where: { email }
        })
        if (checkEmailExist) {
            throw Error('This Email Address already registed.')
        }
        const user = userModel.create({
            name,
            email,
            password
        })
        await userModel.save(user)
        return user
    }
}

export default CreateUserService
