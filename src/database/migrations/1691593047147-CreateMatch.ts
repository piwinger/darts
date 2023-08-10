import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMatch1691593047147 implements MigrationInterface {
    name = 'CreateMatch1691593047147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "match" ("id" SERIAL NOT NULL, "challengerScore" integer NOT NULL DEFAULT '0', "opponentScore" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "challengerId" integer, "opponentId" integer, CONSTRAINT "PK_92b6c3a6631dd5b24a67c69f69d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_7a893b352bb59074dfc720da3c2" FOREIGN KEY ("challengerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_7efcae0561c2d0bceb0b0eeff39" FOREIGN KEY ("opponentId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_7efcae0561c2d0bceb0b0eeff39"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_7a893b352bb59074dfc720da3c2"`);
        await queryRunner.query(`DROP TABLE "match"`);
    }

}
