import {Column, Entity, JoinColumn, OneToMany} from "typeorm";
import {UserInterface, UserRolesEnum} from "../interfaces/user.interface";
import {BaseEntity} from "../../common/entities/base.entity";
import {Exclude} from "class-transformer";
import {BookmarkEntity} from "../../bookmark/entities/bookmark.entity";

@Entity()
export class UserEntity extends BaseEntity implements UserInterface {
    @Column({type: "varchar", unique: true })
    username: string

    @Column({type: "varchar"})
    @Exclude()
    password: string

    @Column({type: "enum", enum: UserRolesEnum})
    role: UserRolesEnum

    @OneToMany(() => BookmarkEntity, bookmark => bookmark.user, { eager: true })
    bookmarks: BookmarkEntity[];
}