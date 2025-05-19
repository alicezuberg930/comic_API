import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ChapterData, ComicData } from './dto/create-comic.dto';
import { UpdateComicDto } from './dto/update-comic.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comic, ComicDocument } from './schemas/comic.schema';
import { Model, Types } from 'mongoose';
import { Chapter, ChapterDocument } from './schemas/chapter.schema';

@Injectable()
export class ComicService {
  constructor(
    @InjectModel(Comic.name) private comicModel: Model<ComicDocument>,
    @InjectModel(Chapter.name) private chapterModel: Model<ChapterDocument>
  ) { }

  async create(data: ComicData) {
    try {
      const comic = await this.comicModel.create(data)
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

  async update(comicId: string, chapterId: string, updateComicDto: ChapterData) {
    try {
      if (!Types.ObjectId.isValid(comicId) || !Types.ObjectId.isValid(chapterId))
        throw new BadRequestException('Invalid comic or chapter ID');
      const updatedComic = await this.chapterModel.findOneAndUpdate({ _id: chapterId }, { ...updateComicDto }, { new: true })
      // const updatedComic = await this.comicModel.findOneAndUpdate(
      //   { _id: comicId, 'chapters._id': chapterId },
      //   {
      //     $set: {
      //       'chapters.$': {
      //         ...updateComicDto,
      //         _id: chapterId,
      //       },
      //     },
      //   },
      //   { new: true, runValidators: true },
      // ).exec();
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