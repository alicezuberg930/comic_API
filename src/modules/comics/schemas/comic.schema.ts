import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { status } from "../dto/enum"
import { Document } from "mongoose"

@Schema({ timestamps: true })
export class Comic extends Document {
    @Prop()
    title: string

    @Prop()
    cover: string

    @Prop({ enum: status })
    status: string

    @Prop({ default: 0 })
    averageRating: number

    @Prop()
    story: string

    @Prop()
    illustrator: string

    @Prop()
    description: string
}

const ComicSchema = SchemaFactory.createForClass(Comic)

ComicSchema.virtual('chapters', {
    ref: 'Chapter', // Reference the Chapter model
    localField: '_id', // Field in Comic schema to match
    foreignField: 'comicId', // Field in Chapter schema to match
    options: { sort: { chapterNumber: 1 } }, // Sort chapters by chapterNumber
});

export { ComicSchema }