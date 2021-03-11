export default interface IHashPassword {
    hash(payload: string): Promise<string>
    compare(payload: string, hashPayload: string): Promise<boolean>
}
