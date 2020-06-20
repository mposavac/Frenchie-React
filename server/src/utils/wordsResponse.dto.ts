import { BaseEntity } from './Base.entity';
import { ApiProperty } from '@nestjs/swagger';

export class WordsResponseDto {
  constructor(entity: BaseEntity) {
    this.word = entity.word;
    this.translation = entity.translation;
  }

  @ApiProperty()
  word: string;

  @ApiProperty()
  translation: string;
}
