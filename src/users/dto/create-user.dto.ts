import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class CreateUserDto {
    @IsString()
    @MinLength(5)
    name: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}
