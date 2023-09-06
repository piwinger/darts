import { MigrationInterface, QueryRunner } from "typeorm";

export class MatchPlayer1693999587420 implements MigrationInterface {
    name = 'MatchPlayer1693999587420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_7a893b352bb59074dfc720da3c2"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_7efcae0561c2d0bceb0b0eeff39"`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_7a893b352bb59074dfc720da3c2" FOREIGN KEY ("challengerId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_7efcae0561c2d0bceb0b0eeff39" FOREIGN KEY ("opponentId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_7efcae0561c2d0bceb0b0eeff39"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_7a893b352bb59074dfc720da3c2"`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_7efcae0561c2d0bceb0b0eeff39" FOREIGN KEY ("opponentId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_7a893b352bb59074dfc720da3c2" FOREIGN KEY ("challengerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
