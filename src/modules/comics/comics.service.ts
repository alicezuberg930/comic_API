import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ComicData } from './dto/create-comic.dto';
import { UpdateComicDto } from './dto/update-comic.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comic } from './schemas/comic.schema';
import { Model, Types } from 'mongoose';
import { Chapter } from '../chapters/schemas/chapter.schema';
import { ChapterService } from '../chapters/chapter.service';

@Injectable()
export class ComicService {
  constructor(
    @InjectModel(Comic.name) private comicModel: Model<Comic>,
    // @InjectModel(Chapter.name) private chapterModel: Model<Chapter>,
    private chapterService: ChapterService
  ) { }

  async create(data: ComicData) {
    try {
      const comic = await this.comicModel.create(data)
      if (data.chapters) {
        await this.chapterService.create(data.chapters)
      }
      return comic
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findAll() {
    try {
      const comics = await this.comicModel.find()
      return comics
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} comic`;
  }

  async update(comicId: string, chapterId: string, updateComicDto: ComicData) {
    try {
      if (!Types.ObjectId.isValid(comicId) || !Types.ObjectId.isValid(chapterId))
        throw new BadRequestException('Invalid comic or chapter ID');
      // const updatedComic = await this.chapterModel.findOneAndUpdate({ _id: chapterId }, { ...updateComicDto }, { new: true })
      const updatedComic = await this.comicModel.findOneAndUpdate(
        { _id: comicId, 'chapters._id': chapterId },
        {
          $set: {
            'chapters.$': {
              ...updateComicDto,
              _id: chapterId,
            },
          },
        },
        { new: true, runValidators: true },
      ).exec();
      if (!updatedComic)
        throw new NotFoundException(`Comic with ID ${comicId} or Chapter with ID ${chapterId} not found`,)
      return updatedComic;
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  remove(id: number) {
    return `This action removes a #${id} comic`;
  }
}