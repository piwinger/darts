import { User } from "src/users/entities/user.entity";
import { EntityHelper } from "src/utils/entity-helper";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Player extends EntityHelper {

    @PrimaryGeneratedColumn()
    id: number

    @Column({default: 1000})
    points: number

    @ManyToOne(() => User, {eager: true})
    @JoinColumn()
    user: User
 }
 