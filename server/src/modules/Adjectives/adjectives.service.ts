import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdjectivesEntity } from './adjectives.entity';
import { Repository } from 'typeorm';
import { WordsResponseDto } from 'src/utils/wordsResponse.dto';

@Injectable()
export class AdjectivesService {
  constructor(
    @InjectRepository(AdjectivesEntity)
    private AdjectivesRepository: Repository<AdjectivesEntity>,
  ) {}

  async findAll(): Promise<WordsResponseDto[]> {
    try {
      const adjectives = await this.AdjectivesRepository.find({});
      const stripedAdjectives = adjectives.map(adjective => ({
        word: adjective.word,
        translation: adjective.translation,
      }));
      return [...stripedAdjectives];
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
