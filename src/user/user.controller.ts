import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {ParseIntPipe} from "../common/pipes/parse-int.pipe";
import {UserInterface, UserRolesEnum} from "./interfaces/user.interface";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post()
    // @Roles(['admin'])
    create(@Body() createUserDto: CreateUserDto){
        return this.userService.creatUser(createUserDto)
    }


    @Get(':id')
    findOne(
        @Param('id', new ParseIntPipe())
            id: number,
    ) {
        return this.userService.findUserById(id)
    }


    @Get()
    findAll() {
        return this.userService.findAll()
    }
}
