import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {BookmarkEntity} from "./entities/bookmark.entity";
import {Repository} from "typeorm";
import {UserService} from "../user/user.service";
import {CatsService} from "../cats/cats.service";

@Injectable()
export class BookmarkService {
    constructor(
        @InjectRepository(BookmarkEntity)
        private readonly  bookmarkRepository: Repository<BookmarkEntity>,
        private readonly userService: UserService,
        private catService: CatsService,
    ) {}
    async addBookmark(userId: number, catId: number): Promise<BookmarkEntity> {
        const cat = await this.catService.findById(catId);
        if (!cat) {
            throw new BadRequestException("Cat does not exist")
        }
        const user = await this.userService.findUserById(userId);
        if (!user) {
            throw new BadRequestException("User does not exist")
        }

        const existingBookmark = await this.bookmarkRepository.findOne({
            where: {
                cat: {  id: catId },
                user: { id: userId },
            },
        });

        if (existingBookmark) {
            throw new BadRequestException('Bookmark already exists for this cat and user.');
        }

        const newBookmark = this.bookmarkRepository.create({
            user,
            cat,
        });
        return await this.bookmarkRepository.save(newBookmark);
    }

    async removeBookmark(userId: number, catId: number): Promise<void> {
        const bookmark = await this.bookmarkRepository.findOne({
            where: {
                user: { id: userId },
                cat: { id: catId },
            },
        });


        if (!bookmark) {
            throw new BadRequestException(`Bookmark not found`);
        }

        await this.bookmarkRepository.remove(bookmark);
    }

}
