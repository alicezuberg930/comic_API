import { BadRequestException, Injectable } from '@nestjs/common';
import { ChapterData } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Chapter } from './schemas/chapter.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class ChapterService {
  constructor(
    @InjectModel(Chapter.name) private chapterModel: Model<Chapter>
  ) { }

  async create(data: ChapterData | ChapterData[], comicId: string) {
    try {
      let chapters = {}
      const ref = new Types.ObjectId(comicId)
      if (Array.isArray(data)) {
        chapters = data.map((chapter: ChapterData) => ({
          ...chapter, comicId: ref
        }));
      } else {
        chapters = { ...data, comicId: ref }
      }
      await this.chapterModel.create(chapters)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  findAll() {
    return `This action returns all chapter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chapter`;
  }

  update(id: number, updateChapterDto: UpdateChapterDto) {
    return `This action updates a #${id} chapter`;
  }

  remove(id: number) {
    return `This action removes a #${id} chapter`;
  }
}
