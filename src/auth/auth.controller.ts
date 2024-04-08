import {Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express'
import {AuthService} from "./auth.service";
import {AuthGuard} from "@nestjs/passport";
import {RegisterDto} from "./dtos/register.dto";
import {RequestWithUser} from "../cats/interfaces/request-with-user.type";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() body: RegisterDto) {
       return this.authService.register(body);
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req: RequestWithUser) {
        return this.authService.login(req)
    }
}
