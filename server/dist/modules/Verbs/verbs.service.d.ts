import { VerbsEntity } from './verbs.entity';
import { Repository } from 'typeorm';
import { WordsResponseDto } from 'src/utils/wordsResponse.dto';
export declare class VerbsService {
    private VerbsRepository;
    constructor(VerbsRepository: Repository<VerbsEntity>);
    findAll(): Promise<WordsResponseDto[]>;
}
