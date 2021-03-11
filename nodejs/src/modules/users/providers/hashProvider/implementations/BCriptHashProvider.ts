import { hash as BHash, compare as BCompare } from 'bcrypt'
import IHashPassword from '../models/IHashPassword'

class BCriptHashProvider implements IHashPassword {
    public async hash(payload: string): Promise<string> {
        const hashPaload = await BHash(payload, 8)

        return hashPaload
    }

    public async compare(
        payload: string,
        hashPayload: string
    ): Promise<boolean> {
        const decriptPayload = await BCompare(payload, hashPayload)

        return decriptPayload
    }
}

export default BCriptHashProvider
