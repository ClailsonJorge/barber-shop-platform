import path from 'path'
import fs from 'fs'

import uploadonfig from '@config/upload'
import IStorageInterface from '../models/IStorageProvider'

class DiskStorage implements IStorageInterface {
    public async saveFile(file: string): Promise<string> {
        await fs.promises.rename(
            path.resolve(uploadonfig.tmpFolder, file),
            path.resolve(uploadonfig.uploadsFolder, file)
        )

        return file
    }

    public async deleteFile(file: string): Promise<void> {
        const filePath = path.resolve(uploadonfig.uploadsFolder, file)

        try {
            await fs.promises.stat(filePath)
        } catch {
            return
        }

        await fs.promises.unlink(filePath)
    }
}

export default DiskStorage
