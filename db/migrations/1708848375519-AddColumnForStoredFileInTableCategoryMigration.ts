import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnForStoredFileInTableCategoryMigration1708848375519 implements MigrationInterface {
    name = 'AddColumnForStoredFileInTableCategoryMigration1708848375519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`base_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`file\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`blogs\` DROP FOREIGN KEY \`FK_8c937e1b5e2c1269689bcf1138e\``);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`categoryId\` \`categoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`blogs\` ADD CONSTRAINT \`FK_8c937e1b5e2c1269689bcf1138e\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`blogs\` DROP FOREIGN KEY \`FK_8c937e1b5e2c1269689bcf1138e\``);
        await queryRunner.query(`ALTER TABLE \`blogs\` CHANGE \`categoryId\` \`categoryId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`blogs\` ADD CONSTRAINT \`FK_8c937e1b5e2c1269689bcf1138e\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`file\``);
        await queryRunner.query(`DROP TABLE \`base_entity\``);
    }

}
