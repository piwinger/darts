import { Exclude } from "class-transformer";
import { League } from "src/league/entities/league.entity";
import { Player } from "src/player/entities/player.entity";
import { EntityHelper } from "src/utils/entity-helper";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Match extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => League)
    league: League

    @ManyToOne(() => Player, { eager: true })
    challenger: Player

    @ManyToOne(() => Player, { eager: true })
    opponent: Player

    @Column({ default: 0 })
    challengerScore: number

    @Column({ default: 0 })
    opponentScore: number

    @Column({ default: 0 })
    challengerPoints: number

    @Column({ default: 0 })
    opponentPoints: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Exclude()
    @DeleteDateColumn()
    deletedAt: Date;

}
