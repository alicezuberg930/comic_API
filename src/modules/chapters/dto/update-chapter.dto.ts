import { PartialType } from '@nestjs/mapped-types';
import { ChapterData } from './create-chapter.dto';

export class UpdateChapterDto extends PartialType(ChapterData) {}
