import { v4 as uuid } from 'uuid'
import UserToken from '@modules/users/infra/typeorm/entities/userToken'
import IUserTokenRepository from '../IUserTokenRepository'

class FakerUserTokenRepository implements IUserTokenRepository {
    private usersToken: UserToken[] = []

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = new UserToken()

        userToken.id = uuid()
        userToken.token = uuid()
        userToken.user_id = user_id

        this.usersToken.push(userToken)

        return userToken
    }
}

export default FakerUserTokenRepository
