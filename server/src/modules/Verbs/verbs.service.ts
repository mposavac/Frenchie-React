import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VerbsEntity } from './verbs.entity';
import { Repository } from 'typeorm';
import { WordsResponseDto } from 'src/utils/wordsResponse.dto';

@Injectable()
export class VerbsService {
  constructor(
    @InjectRepository(VerbsEntity)
    private VerbsRepository: Repository<VerbsEntity>,
  ) {}

  async findAll(): Promise<WordsResponseDto[]> {
    try {
      const verbs = await this.VerbsRepository.find({});
      const stripedVerbs = verbs.map(noun => ({
        word: noun.word,
        translation: noun.translation,
      }));
      return [...stripedVerbs];
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
