import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { status } from "./enum";

export class ChapterData {
    @IsNotEmpty({ message: "Tên người dùng không được để trống" })
    name: string

    @IsNotEmpty({ message: "Tên người dùng không được để trống" })
    episode: number

    @IsNotEmpty({ message: "Tên người dùng không được để trống" })
    cover: string

    @IsNotEmpty({ message: "Tên người dùng không được để trống" })
    images: string[]
}

export class ComicData {
    @IsNotEmpty({ message: "Tên người dùng không được để trống" })
    name: string

    @IsOptional()
    averageRating: number

    @IsNotEmpty({ message: "Ảnh bìa dùng không được để trống" })
    cover: string

    @IsEnum(status, { message: "Trạng thái không hợp lệ" })
    @IsNotEmpty({ message: "Trạng thái không được để trống" })
    status: string

    @IsNotEmpty()
    chapters: ChapterData
}
