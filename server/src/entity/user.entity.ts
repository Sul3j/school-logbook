import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ROLE} from "../data/user.role";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({
        unique: true
    })
    email!: string;

    @Column()
    password!: string;

    @Column()
    role!: ROLE;
}