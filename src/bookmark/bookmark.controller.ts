import {Controller, Delete, Param, Post, UseGuards} from '@nestjs/common';
import {BookmarkService} from "./bookmark.service";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../common/decorators/get-user.decorator";

@Controller('bookmark')
export class BookmarkController {
    constructor(private readonly bookmarkService: BookmarkService) {}

    @Post(':catId')
    @UseGuards(AuthGuard('jwt'))
    addBookmark(@GetUser() user, @Param('catId') catId: number) {
        return this.bookmarkService.addBookmark(user.id, catId);
    }

    @Delete(':catId')
    @UseGuards(AuthGuard('jwt'))
    removeBookmark(@GetUser() user, @Param('catId') catId: number) {
        return this.bookmarkService.removeBookmark(user.id, catId);
    }
}
