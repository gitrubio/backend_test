import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn, } from "typeorm";

@Entity('users')

export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: false})
    fullName: string;

    @Column({nullable: false, default:false})
    isAdmin: boolean;

    @Column({nullable: false, unique: true})
    email: string;
    
    @Column({nullable: false})
    password: string;

    @DeleteDateColumn()
    deletedAt: Date;
}
