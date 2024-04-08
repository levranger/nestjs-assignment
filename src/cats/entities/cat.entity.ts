import {Column, Entity, OneToMany} from "typeorm";
import {BaseEntity} from "../../common/entities/base.entity";
import {CatInterface} from "../interfaces/cat.interface";
import {BookmarkEntity} from "../../bookmark/entities/bookmark.entity";

@Entity()
export class CatEntity extends BaseEntity implements CatInterface {
    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "integer"})
    age: number;

    @Column({ type: "varchar" })
    breed: string;

    @OneToMany(() => BookmarkEntity, bookmark => bookmark.cat)
    bookmarks: BookmarkEntity[];
}