import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type ChapterDocument = HydratedDocument<Chapter>

@Schema({ timestamps: true })
export class Chapter {
    @Prop()
    name: string

    @Prop()
    episode: number

    @Prop()
    cover: string

    @Prop({ default: [] })
    images: string[]
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter)