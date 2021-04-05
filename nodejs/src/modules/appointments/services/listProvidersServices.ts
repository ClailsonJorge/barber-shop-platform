import { inject, injectable } from 'tsyringe'
import User from '@modules/users/infra/typeorm/entities/user'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICacheProvider from '@shared/container/providers/cacheProvider/models/ICacheProvider'

interface IExecuteParams {
    user_id: string
}

@injectable()
export default class ListProvidersService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
    ) {}

    public async execute({ user_id }: IExecuteParams): Promise<User[]> {
        let users = await this.cacheProvider.recover<User[]>(
            `providers-list:${user_id}`
        )

        if (!users) {
            users = await this.userRepository.findAllProviders({
                except_user_id: user_id
            })

            await this.cacheProvider.save(`providers-list:${user_id}`, users)
        }

        return users
    }
}
