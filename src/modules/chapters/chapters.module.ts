import { Module } from '@nestjs/common';
import { ChapterService } from './chapters.service';
import { ChapterController } from './chapters.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chapter, ChapterSchema } from './schemas/chapter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chapter.name, schema: ChapterSchema }
    ])
  ],
  controllers: [ChapterController],
  providers: [ChapterService],
})
export class ChapterModule { }
