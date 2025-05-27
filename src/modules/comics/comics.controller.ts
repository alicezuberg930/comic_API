import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, BadRequestException, Req } from '@nestjs/common';
import { ComicService } from './comics.service';
import { ComicData } from './dto/create-comic.dto';
import { UpdateComicDto } from './dto/update-comic.dto';
import { AnyFilesInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/public.decorator';
import { diskStorage } from 'multer';
import { Request } from 'express';

@Controller('comics')
export class ComicController {
  constructor(private readonly comicService: ComicService) { }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    // @Req() request: Request
    @Body() body: string
  ) {
    return body
    // const data: ComicData = JSON.parse(body)
    // return this.comicService.create(files, data);
  }

  @Get()
  findAll() {
    return this.comicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comicService.findOne(id);
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
