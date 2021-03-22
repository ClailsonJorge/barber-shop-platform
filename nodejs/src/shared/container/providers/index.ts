import { container } from 'tsyringe'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/appointmentsRepository'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/usersRepository'

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/userTokensRepository'

import DiskStorage from './diskStorage/implementations/diskStorageProvider'
import IStorageProvider from './diskStorage/models/IStorageProvider'

import IMailProvider from './mailProvider/models/IMailProvider'
import EtherealMailProvider from './mailProvider/implementations/etherealMailProvider'

import IMailTemplateProvider from './mailTemplateProvider/models/IMailTemplateProvider'
import HandlebarsMailTemplateProvider from './mailTemplateProvider/implementations/handlebarsMailTemplateProvider'

container.registerSingleton<IStorageProvider>(
    'diskStorageProvider',
    DiskStorage
)

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    HandlebarsMailTemplateProvider
)

container.registerInstance<IMailProvider>(
    'SendEmailProvider',
    container.resolve(EtherealMailProvider)
)

container.registerSingleton<IAppointmentsRepository>(
    'AppointmentsRepository',
    AppointmentsRepository
)

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
)

container.registerSingleton<IUserTokensRepository>(
    'UserTokensRepository',
    UserTokensRepository
)
