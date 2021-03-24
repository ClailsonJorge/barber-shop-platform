import { inject, injectable } from 'tsyringe'
import User from '@modules/users/infra/typeorm/entities/user'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

interface IExecuteParams {
    user_id: string
}

interface IUserReturn extends Omit<User, 'password'> {
    password?: string
}

@injectable()
export default class ListProvidersService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository
    ) {}

    public async execute({ user_id }: IExecuteParams): Promise<IUserReturn[]> {
        const user = await this.userRepository.findAllProviders({
            except_user_id: user_id
        })

        return user
    }
}
