import { Transform } from "class-transformer";
import { IsString, MinLength } from "class-validator";

export class LoginDto  {

    @Transform(({ value }) => value.trim())
    @MinLength(6)
    @IsString()
    name: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(8)
    password: string;

}
