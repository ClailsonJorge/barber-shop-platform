import { container } from 'tsyringe'
import BCriptHashProvider from './implementations/BCriptHashProvider'
import IHashPassword from './models/IHashPassword'

container.registerSingleton<IHashPassword>('hashPassword', BCriptHashProvider)
