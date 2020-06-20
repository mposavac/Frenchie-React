import { NounsEntity } from './nouns.entity';
import { Repository } from 'typeorm';
import { WordsResponseDto } from 'src/utils/wordsResponse.dto';
export declare class NounsService {
    private NounsRepository;
    constructor(NounsRepository: Repository<NounsEntity>);
    findAll(): Promise<WordsResponseDto[]>;
}
