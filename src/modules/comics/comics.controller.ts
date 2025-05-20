import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComicService } from './comics.service';
import { ChapterData, ComicData } from './dto/create-comic.dto';
import { UpdateComicDto } from './dto/update-comic.dto';

@Controller('comic')
export class ComicController {
  constructor(private readonly comicService: ComicService) { }

  @Post()
  create(@Body() data: ComicData) {
    return this.comicService.create(data);
  }

  @Get()
  findAll() {
    return this.comicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comicService.findOne(+id);
  }

  @Patch(':comidId/:chapterId')
  update(@Param('comidId') comicId: string, @Param('chapterId') chapterId: string, @Body() updateComicDto: ComicData) {
    return this.comicService.update(comicId, chapterId, updateComicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comicService.remove(+id);
  }
}
