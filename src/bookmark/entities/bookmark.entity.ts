import {Entity, ManyToOne} from "typeorm";
import {BaseEntity} from "../../common/entities/base.entity";
import {UserEntity} from "../../user/entities/user.entity";
import {CatEntity} from "../../cats/entities/cat.entity";

@Entity()
export class BookmarkEntity extends BaseEntity {
    @ManyToOne(() => UserEntity, user => user.bookmarks)
    user: UserEntity;

    @ManyToOne(() => CatEntity, cat => cat.bookmarks, { eager: true })
    cat: CatEntity;
}