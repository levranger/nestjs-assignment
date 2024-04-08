import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "./entities/user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {UserInterface, UserRolesEnum} from "./interfaces/user.interface";
import * as bcrypt from 'bcrypt';
import {classToPlain} from "class-transformer";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>){}

    async creatUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.repository.create({ ...createUserDto, role: UserRolesEnum.User, password: hashedPassword })

        return  this.repository.save(user);

    }

    async findUserById(id: number): Promise<UserEntity> {
        return this.repository.findOne({ where: { id: id }})
    }

    async findAll(): Promise<UserEntity[]> {
        return this.repository.find();
    }

    async findUserByUsername(username: string): Promise<UserEntity> {
        return this.repository.findOne({ where: { username : username }})
    }
}
