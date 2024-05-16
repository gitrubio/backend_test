import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({nullable: false})
    Handle: string

    @Column({nullable: false})
    TitleL: string

    @Column({nullable: false})
    Description: string

    @Column({nullable: false})
    SKU: string

    @Column({nullable: false})
    Grams: number

    @Column({nullable: false})
    Stock: number

    @Column({nullable: false})
    Price: number

    @Column({nullable: false})
    CompareAtPrice: number

    @Column({nullable: false})
    Barcode: string
}
