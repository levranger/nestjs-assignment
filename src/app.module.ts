import {ClassSerializerInterceptor, Module} from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import {CatEntity} from "./cats/entities/cat.entity";
import { UserModule } from './user/user.module';
import {UserEntity} from "./user/entities/user.entity";
import {ConfigModule, ConfigService} from "@nestjs/config";
import * as Joi from "joi";
import {APP_INTERCEPTOR} from "@nestjs/core";
import { BookmarkModule } from './bookmark/bookmark.module';
import {BookmarkEntity} from "./bookmark/entities/bookmark.entity";

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: './.env',
          validationSchema: Joi.object({
              JWT_SECRET: Joi.string().required(),
              JWT_EXPIRATION_TIME: Joi.string().required(),
              DATABASE_HOST: Joi.string().required(),
              DATABASE_PORT: Joi.number().required(),
              DATABASE_USERNAME: Joi.string().required(),
              DATABASE_PASSWORD: Joi.string().required(),
              DATABASE_NAME: Joi.string().required(),
          }),
      }),
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
              type: 'postgres',
              host: configService.get('DATABASE_HOST'),
              port: configService.get('DATABASE_PORT'),
              username: configService.get('DATABASE_USERNAME'),
              password: configService.get('DATABASE_PASSWORD'),
              database: configService.get('DATABASE_NAME'),
              entities: [CatEntity, UserEntity, BookmarkEntity],
              synchronize: true,
          }),
      }),
      CoreModule,
      CatsModule,
      AuthModule,
      UserModule,
      BookmarkModule,
  ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
    ],
})
export class AppModule {}
