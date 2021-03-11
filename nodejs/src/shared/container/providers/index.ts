import { container } from 'tsyringe'

import IStorageProvider from './models/IStorageProvider'
import DiskStorage from './implementations/diskStorageProvider'

container.registerSingleton<IStorageProvider>(
    'diskStorageProvider',
    DiskStorage
)
