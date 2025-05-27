import { IsEnum, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { status } from "./enum";
import { ChapterData } from "src/modules/chapters/dto/create-chapter.dto";
import { Type } from "class-transformer";

export class ComicData {
    @IsNotEmpty({ message: "Tên người dùng không được để trống" })
    title: string

    @IsOptional()
    averageRating: number

    @IsNotEmpty({ message: "Ảnh bìa dùng không được để trống" })
    cover: string

    @IsEnum(status, { message: "Trạng thái không hợp lệ" })
    status: string

    @IsNotEmpty({ message: 'Câu truyện không được để trống' })
    story: string

    @IsNotEmpty({ message: 'Người vẽ không được để trống' })
    illustrator: string

    @IsOptional()
    description: string

    @IsOptional()
    @ValidateNested({ each: true }) // Ensures validation for each item in the array
    @Type(() => ChapterData) // Specifies the class type for transformation
    chapters: ChapterData[]
}