import { getRepository, Repository } from 'typeorm'
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import UserToken from '../entities/userToken'

class UserTokensRepository implements IUserTokensRepository {
    private userTokensRepository: Repository<UserToken>

    constructor() {
        this.userTokensRepository = getRepository(UserToken)
    }

    public async generate(user_id: string): Promise<UserToken | undefined> {
        const userToken = this.userTokensRepository.create({
            user_id
        })

        await this.userTokensRepository.save(userToken)

        return userToken
    }

    public async findUserByToken(
        token: string
    ): Promise<UserToken | undefined> {
        const userToken = this.userTokensRepository.findOne({
            where: { token }
        })
        return userToken
    }
}

export default UserTokensRepository
