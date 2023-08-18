import { Player } from "src/player/entities/player.entity";
import { User } from "src/users/entities/user.entity";
import { EntityHelper } from "src/utils/entity-helper";
import { AfterLoad, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class League extends EntityHelper {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @ManyToMany(() => Player)
    @JoinTable()
    players: Player[]
 }
 