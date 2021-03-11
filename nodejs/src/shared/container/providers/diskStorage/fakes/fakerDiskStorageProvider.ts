import IStorageInterface from '../models/IStorageProvider'

class FakerDiskStorageProvider implements IStorageInterface {
    private diskStorage: string[] = []

    public async saveFile(file: string): Promise<string> {
        this.diskStorage.push(file)

        return file
    }

    public async deleteFile(file: string): Promise<void> {
        const fileIndex = this.diskStorage.findIndex(
            (filePath) => filePath === file
        )

        this.diskStorage.splice(fileIndex, 1)
    }
}

export default FakerDiskStorageProvider
