import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateBannerDto {
    @IsNotEmpty({ message: "Thứ tự banner không được để trống" })
    order: number

    @IsNotEmpty({ message: "Ảnh banner không được để trống" })
    image: string

    @IsOptional()
    name: string
}
