import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ComicData } from './dto/create-comic.dto';
import { UpdateComicDto } from './dto/update-comic.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comic } from './schemas/comic.schema';
import { Model, Types } from 'mongoose';
import { ChapterService } from '../chapters/chapters.service';
import { ChapterData } from '../chapters/dto/create-chapter.dto';
import { Chapter } from '../chapters/schemas/chapter.schema';

@Injectable()
export class ComicService {
  constructor(
    @InjectModel(Comic.name) private comicModel: Model<Comic>,
    @InjectModel(Chapter.name) private chapterModel: Model<Chapter>,
    private chapterService: ChapterService
  ) { }

  async create(files: Express.Multer.File[], body: string) {
    try {
      try {
        const comicData = body
        if (!comicData) {
          throw new BadRequestException('comicData is missing or undefined');
        }
        const chapterFilesMap: { [key: number]: Express.Multer.File[] } = {};
        files.forEach((file) => {
          const match = file.fieldname.match(/chapterFiles\[(\d+)\]/);
          if (match) {
            const chapterIndex = parseInt(match[1], 10);
            if (!chapterFilesMap[chapterIndex]) {
              chapterFilesMap[chapterIndex] = [];
            }
            chapterFilesMap[chapterIndex].push(file);
          }
        });
        console.log(chapterFilesMap)
        return JSON.parse(comicData)
        // return chapterFilesMap
      } catch (error) {
        throw new BadRequestException(error)
      }
      // const comic = await this.comicModel.create(data)
      // if (data.chapters) {
      //   // let chapters: ChapterData | ChapterData[]
      //   await this.chapterService.create(data.chapters, comic.id)
      // }
      // return comic
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

  async findOne(id: string) {
    try {
      return await this.comicModel
        .findById(id)
        .populate({
          path: 'chapters',
          model: this.chapterModel,
          options: { sort: { chapterNumber: 1 } },
        })
        .lean()
    } catch (error) {
      throw new BadRequestException(error)
    }
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