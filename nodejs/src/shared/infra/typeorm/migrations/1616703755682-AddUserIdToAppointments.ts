import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey
} from 'typeorm'

export default class AddUserIdToAppointments1616703755682
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnProvider = new TableColumn({
            name: 'user_id',
            type: 'uuid',
            isNullable: true
        })

        await queryRunner.addColumn('appointment', columnProvider)

        const foreignKey = new TableForeignKey({
            name: 'AppointmentUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        })
        await queryRunner.createForeignKey('appointment', foreignKey)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointment', 'AppointmentUser')

        await queryRunner.dropColumn('appointment', 'user_id')
    }
}
