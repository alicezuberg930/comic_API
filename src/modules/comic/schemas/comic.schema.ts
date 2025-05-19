import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { status } from "../dto/enum";
import { Chapter } from "./chapter.schema";

export type ComicDocument = HydratedDocument<Comic>

@Schema({ timestamps: true })
export class Comic {
    @Prop()
    name: string

    @Prop()
    cover: string

    @Prop({  status })
    status: string

    @Prop({ default: 0 })
    averageRating: number

    @Prop({ type: [Chapter], default: [] })
    chapters: Chapter[]
}

export const ComicSchema = SchemaFactory.createForClass(Comic)