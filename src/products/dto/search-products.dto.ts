import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class SearchProductDto {
    @IsOptional()
    @IsString()
    title: string;
    
    @Transform(({ value }) => +value)
    @IsOptional()
    @IsNumber()
    offset: number = 0;
    
    @Transform(({ value }) => +value)
    @IsOptional()
    @IsNumber()
    limit: number = 10;
}
