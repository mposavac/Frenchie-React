import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasicsEntity } from './basics.entity';
import { Repository } from 'typeorm';
import { WordsResponseDto } from '../../utils/wordsResponse.dto';

@Injectable()
export class BasicsService {
  constructor(
    @InjectRepository(BasicsEntity)
    private BasicsRepository: Repository<BasicsEntity>,
  ) {}

  async findAll(): Promise<WordsResponseDto[]> {
    try {
      const basics = await this.BasicsRepository.find({});
      const stripedBasics = basics.map(basic => ({
        word: basic.word,
        translation: basic.translation,
        category: basic.category,
      }));
      return [...stripedBasics];
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
