import { BadRequestException, Injectable } from '@nestjs/common';
import { ChapterData } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Chapter } from './schemas/chapter.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChapterService {
  constructor(
    @InjectModel(Chapter.name) private chapterModel: Model<Chapter>
  ) { }

  async create(data: ChapterData | ChapterData[]) {
    try {
      // if (Array.isArray(data)) {
      //   for (let i = 0; i < data.length; i++) {
      //     await this.chapterModel.create(data)
      //   }
      // } else {
      await this.chapterModel.create(data)
      // }
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
