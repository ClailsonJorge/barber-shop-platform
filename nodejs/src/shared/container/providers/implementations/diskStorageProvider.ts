import uploadonfig from '@config/upload'
import fs from 'fs'
import path from 'path'
import IStorageInterface from '../models/IStorageProvider'

class DiskStorage implements IStorageInterface {
    public async saveFile(file: string): Promise<string> {
        await fs.promises.rename(
            uploadonfig.tmpFolder,
            uploadonfig.uploadsFolder
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
