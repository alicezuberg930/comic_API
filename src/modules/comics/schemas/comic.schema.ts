import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { status } from "../dto/enum"

@Schema({ timestamps: true })
export class Comic extends Document {
    @Prop()
    title: string

    @Prop()
    cover: string

    @Prop({ type: status })
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

export const ComicSchema = SchemaFactory.createForClass(Comic)