import { Module } from '@nestjs/common';
import { ComicService } from './comic.service';
import { ComicController } from './comic.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comic } from './schemas/comic.schema';
import { ComicSchema } from './schemas/comic.schema';
import { Chapter, ChapterSchema } from './schemas/chapter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comic.name, schema: ComicSchema },
      { name: Chapter.name, schema: ChapterSchema }
    ])
  ],
  controllers: [ComicController],
  providers: [ComicService],
})
export class ComicModule { }
