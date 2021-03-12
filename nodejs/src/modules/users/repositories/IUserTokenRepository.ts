import UserToken from '../infra/typeorm/entities/userToken'

export default interface IUserTokenRepository {
    generate(user_id: string): Promise<UserToken>
    findUserTokenById(id: string): Promise<string | undefined>
}
