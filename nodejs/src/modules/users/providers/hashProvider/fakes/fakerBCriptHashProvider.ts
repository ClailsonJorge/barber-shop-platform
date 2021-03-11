import IHashPassword from '../models/IHashPassword'

class FakerBCriptHashProvider implements IHashPassword {
    private async BHash(payload: string, number: number): Promise<string> {
        const hash = 123456789 + number
        payload.includes(hash.toString(), payload.length)

        return payload
    }

    private async BCompare(
        payload: string,
        hashPayload: string
    ): Promise<boolean> {
        const hash = 123456789 + 8
        payload.includes(hash.toString(), payload.length)
        return payload === hashPayload
    }

    public async hash(payload: string): Promise<string> {
        const hashPaload = this.BHash(payload, 8)

        return hashPaload
    }

    public async compare(
        payload: string,
        hashPayload: string
    ): Promise<boolean> {
        const decriptPayload = await this.BCompare(payload, hashPayload)

        return decriptPayload
    }
}

export default FakerBCriptHashProvider
