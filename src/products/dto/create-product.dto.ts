import { Transform } from "class-transformer"
import { IsNumber, IsString, MinLength } from "class-validator"

export class CreateProductDto {
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    Handle: string

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    Title: string

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(16)
    Description: string

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    SKU: string

    @IsNumber()
    Grams: number

    @IsNumber()
    Stock: number

    @IsNumber()
    Price: number

    @IsNumber()
    CompareAtPrice: number

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    Barcode: string
}
