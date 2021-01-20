import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey
} from 'typeorm'

export default class AlterColumnProviderAppointment1611185081150
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointment', 'provider')

        const columnProvider = new TableColumn({
            name: 'provider_id',
            type: 'uuid',
            isNullable: true
        })
        await queryRunner.addColumn('appointment', columnProvider)

        const foreignKey = new TableForeignKey({
            name: 'apointmentForeignKey',
            columnNames: ['provider_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        })
        await queryRunner.createForeignKey('appointment', foreignKey)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointment', 'apointmentForeignKey')

        await queryRunner.dropColumn('appointment', 'provider_id')

        const providerColumn = new TableColumn({
            name: 'provider',
            type: 'varchar'
        })
        await queryRunner.addColumn('appointment', providerColumn)
    }
}
