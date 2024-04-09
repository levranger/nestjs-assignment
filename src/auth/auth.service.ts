import {BadRequestException, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {RegisterDto} from "./dtos/register.dto";
import {UserEntity} from "../user/entities/user.entity";
import * as bcrypt from "bcrypt";
import {UserInterface} from "../user/interfaces/user.interface";
import {RequestWithUser} from "../cats/interfaces/request-with-user.type";


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}


    async register(registerDto: RegisterDto): Promise<UserEntity> {
        const user = await this.userService.findUserByUsername(registerDto.username);
        if (user) {
            throw new BadRequestException('This user is already registered');
        }

        return await this.userService.creatUser(registerDto);
    }

    async login(req: RequestWithUser): Promise<{ access_token: string }> {
        const user = req?.user as UserInterface;
        const payload = { username: req.user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findUserByUsername(username);



        if (user) {
            const isMatch = await bcrypt.compare(pass, user.password);
            if (isMatch) {
                const { password, ...result } = user;
                return result;
            }
        }
        return null;
    }
}
