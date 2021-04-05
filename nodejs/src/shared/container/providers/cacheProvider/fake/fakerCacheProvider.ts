import ICacheProvider from '../models/ICacheProvider'

interface IFakeCacheProvider {
    [key: string]: string
}

export default class FakeCacheProvider implements ICacheProvider {
    private cache: IFakeCacheProvider

    public async save(key: string, value: any): Promise<void> {
        this.cache[key] = JSON.stringify(value)
    }

    public async recover<T>(key: string): Promise<T | null> {
        const data = this.cache[key]

        if (!data) {
            return null
        }

        const parsedData = JSON.parse(data) as T

        return parsedData
    }

    public async invalidate(key: string): Promise<void> {
        if (!this.cache[key]) {
            return
        }

        delete this.cache[key]
    }

    public async invalidatePrefix(prefix: string): Promise<void> {
        const keys = Object.keys(this.cache).filter((key) =>
            key.startsWith(`${prefix}:`)
        )

        if (keys.length === 0) {
            return
        }

        keys.forEach((key) => {
            delete this.cache[key]
        })
    }
}
