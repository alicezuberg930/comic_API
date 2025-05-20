import { Module } from '@nestjs/common';
import { ComicService } from './comics.service';
import { ComicController } from './comics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comic } from './schemas/comic.schema';
import { ComicSchema } from './schemas/comic.schema';
import { Chapter, ChapterSchema } from '../chapters/schemas/chapter.schema';
import { ChapterService } from '../chapters/chapter.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comic.name, schema: ComicSchema },
      { name: Chapter.name, schema: ChapterSchema }
    ])
  ],
  controllers: [ComicController],
  providers: [ComicService, ChapterService],
})
export class ComicModule { }
