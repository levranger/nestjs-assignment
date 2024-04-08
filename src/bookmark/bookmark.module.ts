import {Module} from '@nestjs/common';
import {BookmarkService} from './bookmark.service';
import {BookmarkController} from './bookmark.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {BookmarkEntity} from "./entities/bookmark.entity";
import {UserModule} from "../user/user.module";
import {CatsModule} from "../cats/cats.module";

@Module({
  imports: [TypeOrmModule.forFeature([BookmarkEntity]), UserModule, CatsModule],
  providers: [BookmarkService],
  controllers: [BookmarkController]
})
export class BookmarkModule {}
