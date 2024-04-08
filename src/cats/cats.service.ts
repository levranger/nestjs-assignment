import {BadRequestException, Injectable} from '@nestjs/common';
import { CatInterface } from './interfaces/cat.interface';
import {Repository} from "typeorm";
import {CatEntity} from "./entities/cat.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {UpdateCatDto} from "./dto/update-cat.dto";

@Injectable()
export class CatsService {
  constructor(@InjectRepository(CatEntity)
              private readonly repository: Repository<CatEntity>) {}


  async create(cat: CatInterface): Promise<CatEntity> {
     return this.repository.save(cat);
  }

  async findAll(): Promise<CatInterface[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<CatEntity> {
      const cat = await this.repository.findOne({  where: { id: id}})
      if (!cat) {
          throw new BadRequestException('Cat not found')
      }
      return await this.repository.findOne({  where: { id: id}})
  }

  async delete(id: number): Promise<void> {
      await this.repository.delete(id);
  }

  async update(updateCatDto: UpdateCatDto) {
      const catId = updateCatDto.id;

      const cat = await this.findById(catId);
      if (!cat) {
          throw new Error('Update failed. Cat does not exist')
      }

      this.repository.merge(cat, { ...updateCatDto })

      return this.repository.save(cat);
  }
}
