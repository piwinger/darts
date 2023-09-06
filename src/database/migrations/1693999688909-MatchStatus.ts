import { MigrationInterface, QueryRunner } from "typeorm";

export class MatchStatus1693999688909 implements MigrationInterface {
    name = 'MatchStatus1693999688909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."match_status_enum" AS ENUM('challenged', 'accepted', 'declined', 'done')`);
        await queryRunner.query(`ALTER TABLE "match" ADD "status" "public"."match_status_enum" NOT NULL DEFAULT 'challenged'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."match_status_enum"`);
    }

}
