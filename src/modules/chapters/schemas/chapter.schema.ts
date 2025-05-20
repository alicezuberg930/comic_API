import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

@Schema({ timestamps: true })
export class Chapter extends Document {
    @Prop()
    title: string

    @Prop()
    chapterCount: number

    @Prop({ default: [] })
    images: string[]

    @Prop({ type: Types.ObjectId, ref: 'Comic' })
    comicId: Types.ObjectId;
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter)