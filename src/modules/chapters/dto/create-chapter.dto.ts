import { IsNotEmpty, IsOptional } from "class-validator"
import { Types } from "mongoose"

export class ChapterData {
    @IsNotEmpty({ message: "Tên chương không được để trống" })
    title: string

    @IsNotEmpty({ message: "Số tập không được để trống" })
    chapterCount: number

    @IsNotEmpty({ message: "Ảnh chương không được để trống" })
    images: string[]

    @IsOptional()
    comicId: string
}
