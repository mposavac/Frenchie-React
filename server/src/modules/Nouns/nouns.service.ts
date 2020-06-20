import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NounsEntity } from './nouns.entity';
import { Repository } from 'typeorm';
import { WordsResponseDto } from 'src/utils/wordsResponse.dto';

@Injectable()
export class NounsService {
  constructor(
    @InjectRepository(NounsEntity)
    private NounsRepository: Repository<NounsEntity>,
  ) {}

  async findAll(): Promise<WordsResponseDto[]> {
    try {
      const nouns = await this.NounsRepository.find({});
      const stripedNouns = nouns.map(noun => ({
        word: noun.word,
        translation: noun.translation,
      }));
      return [...stripedNouns];
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
