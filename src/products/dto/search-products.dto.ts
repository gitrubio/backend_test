import { IsNumber, IsOptional, IsString } from "class-validator";

export class SearchProductDto {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsNumber()
    offset: number = 0;
    
    @IsOptional()
    @IsNumber()
    limit: number = 10;
}
