import { ObjectID } from 'mongodb'
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO'
import Notification from '../../infra/typeorm/schemas/Notification'

export default class FakeNotificationsRepository
    implements INotificationsRepository {
    private ormRepository: Notification[]

    constructor() {
        this.ormRepository = []
    }

    public async create({
        content,
        recipient_id
    }: ICreateNotificationDTO): Promise<Notification> {
        const notification = Object.assign(new Notification(), {
            id: new ObjectID(),
            content,
            recipient_id,
            created_at: new Date(Date.now()),
            updated_at: new Date(Date.now())
        })

        await this.ormRepository.push(notification)

        return notification
    }
}
