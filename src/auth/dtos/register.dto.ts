import {IsEmail, IsString} from "class-validator";
import {Exclude} from "class-transformer";

export class RegisterDto {
    @IsString()
    @IsEmail()
    username: string;

    @IsString()
    password:string

}