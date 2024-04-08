import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {RolesGuard} from '../common/guards/roles.guard';
import {ParseIntPipe} from '../common/pipes/parse-int.pipe';
import {CatsService} from './cats.service';
import {CreateCatDto} from './dto/create-cat.dto';
import {CatInterface} from './interfaces/cat.interface';
import {UpdateCatDto} from "./dto/update-cat.dto";
import {AuthGuard} from "@nestjs/passport";
import {Roles} from "../common/decorators/roles.decorator";
import {UserRolesEnum} from "../user/interfaces/user.interface";
import {CatEntity} from "./entities/cat.entity";

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @Roles(UserRolesEnum.Admin)
  create(@Body() createCatDto: CreateCatDto): Promise<CatEntity> {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll(): Promise<CatInterface[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ): Promise<CatEntity> {
    return this.catsService.findById(id);
  }

  @Put()
  @Roles(UserRolesEnum.Admin)
  update(
     @Body() updateCatDto: UpdateCatDto,
  ) {
    return this.catsService.update(updateCatDto);
  }


  @Delete(':id')
  @Roles(UserRolesEnum.Admin)
  async delete(
      @Param('id', new ParseIntPipe())
          id: number,
  ) {
    await this.catsService.delete(id);
    return { message: 'Cat has been deleted' };
  }
}
