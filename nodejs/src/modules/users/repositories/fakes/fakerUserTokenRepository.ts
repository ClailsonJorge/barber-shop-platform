import { v4 as uuid } from 'uuid'
import UserToken from '@modules/users/infra/typeorm/entities/userToken'
import IUserTokensRepository from '../IUserTokensRepository'

class FakerUserTokenRepository implements IUserTokensRepository {
    private usersToken: UserToken[] = []

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = new UserToken()

        userToken.id = uuid()
        userToken.token = uuid()
        userToken.user_id = user_id
        userToken.created_at = new Date(Date.now())
        userToken.updated_at = new Date(Date.now())
        this.usersToken.push(userToken)

        return userToken
    }

    public async findUserByToken(
        token: string
    ): Promise<UserToken | undefined> {
        const userToken = this.usersToken.find(
            (findUserToken) => findUserToken.token === token
        )
        return userToken
    }
}

export default FakerUserTokenRepository
