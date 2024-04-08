import {IsInt, IsNumber, IsOptional} from "class-validator";
import {CreateCatDto} from "./create-cat.dto";

export class UpdateCatDto {
    @IsInt()
    id: number;

    @IsOptional()
    name: string;

    @IsNumber()
    @IsOptional()
    age: number;

    @IsOptional()
    breed: string;
}