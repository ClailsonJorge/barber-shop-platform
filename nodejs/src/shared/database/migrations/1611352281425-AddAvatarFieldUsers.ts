import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export default class AddAvatarFieldUsers1611352281425
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const avatarColumn = new TableColumn({
            name: 'avatar',
            type: 'varchar',
            isNullable: true
        })
        await queryRunner.addColumn('user', avatarColumn)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('user', 'avatar')
    }
}
