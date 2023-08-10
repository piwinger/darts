import { Exclude } from "class-transformer";
import { User } from "src/users/entities/user.entity";
import { EntityHelper } from "src/utils/entity-helper";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Match extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => User, { eager: true })
    player: User

    @Column({ default: 0 })
    challengerScore: number

    @Column({ default: 0 })
    opponentScore: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Exclude()
    @DeleteDateColumn()
    deletedAt: Date;
    
}
