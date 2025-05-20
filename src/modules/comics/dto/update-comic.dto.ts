import { PartialType } from '@nestjs/mapped-types';
import { ComicData } from './create-comic.dto';

export class UpdateComicDto extends PartialType(ComicData) { }
