import { AdjectivesEntity } from './adjectives.entity';
import { Repository } from 'typeorm';
import { WordsResponseDto } from 'src/utils/wordsResponse.dto';
export declare class AdjectivesService {
    private AdjectivesRepository;
    constructor(AdjectivesRepository: Repository<AdjectivesEntity>);
    findAll(): Promise<WordsResponseDto[]>;
}
