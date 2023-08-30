import { Optional } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";
import { EntityHelper } from "src/utils/entity-helper";
import { AfterLoad, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Player extends EntityHelper {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: 1000 })
    points: number

    @ManyToOne(() => User, { eager: true })
    @JoinColumn()
    user: User

    @Optional()
    win: number

    @Optional()
    loss: number

    @Optional()
    canBeChallenged: boolean = false
}
