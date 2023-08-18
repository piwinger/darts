import { MigrationInterface, QueryRunner } from "typeorm";

export class MatchLeaguePlayerTables1692349006693 implements MigrationInterface {
    name = 'MatchLeaguePlayerTables1692349006693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "player" ("id" SERIAL NOT NULL, "points" integer NOT NULL DEFAULT '1000', "userId" integer, CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "league" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_0bd74b698f9e28875df738f7864" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "match" ("id" SERIAL NOT NULL, "challengerScore" integer NOT NULL DEFAULT '0', "opponentScore" integer NOT NULL DEFAULT '0', "challengerPoints" integer NOT NULL DEFAULT '0', "opponentPoints" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "leagueId" integer, "challengerId" integer, "opponentId" integer, CONSTRAINT "PK_92b6c3a6631dd5b24a67c69f69d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "league_players_player" ("leagueId" integer NOT NULL, "playerId" integer NOT NULL, CONSTRAINT "PK_d046ee10e305db53bd60f912f7c" PRIMARY KEY ("leagueId", "playerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c95159a065613b36ace6951be6" ON "league_players_player" ("leagueId") `);
        await queryRunner.query(`CREATE INDEX "IDX_770a30a544c9cfdc23ffef691c" ON "league_players_player" ("playerId") `);
        await queryRunner.query(`ALTER TABLE "user" ADD "playerName" character varying`);
        await queryRunner.query(`ALTER TABLE "player" ADD CONSTRAINT "FK_7687919bf054bf262c669d3ae21" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_96c1ded1c8c70d8bf2f9d486b38" FOREIGN KEY ("leagueId") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_7a893b352bb59074dfc720da3c2" FOREIGN KEY ("challengerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_7efcae0561c2d0bceb0b0eeff39" FOREIGN KEY ("opponentId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "league_players_player" ADD CONSTRAINT "FK_c95159a065613b36ace6951be6f" FOREIGN KEY ("leagueId") REFERENCES "league"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "league_players_player" ADD CONSTRAINT "FK_770a30a544c9cfdc23ffef691c3" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "league_players_player" DROP CONSTRAINT "FK_770a30a544c9cfdc23ffef691c3"`);
        await queryRunner.query(`ALTER TABLE "league_players_player" DROP CONSTRAINT "FK_c95159a065613b36ace6951be6f"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_7efcae0561c2d0bceb0b0eeff39"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_7a893b352bb59074dfc720da3c2"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_96c1ded1c8c70d8bf2f9d486b38"`);
        await queryRunner.query(`ALTER TABLE "player" DROP CONSTRAINT "FK_7687919bf054bf262c669d3ae21"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "playerName"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_770a30a544c9cfdc23ffef691c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c95159a065613b36ace6951be6"`);
        await queryRunner.query(`DROP TABLE "league_players_player"`);
        await queryRunner.query(`DROP TABLE "match"`);
        await queryRunner.query(`DROP TABLE "league"`);
        await queryRunner.query(`DROP TABLE "player"`);
    }

}
