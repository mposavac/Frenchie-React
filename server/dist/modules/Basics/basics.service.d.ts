import { BasicsEntity } from './basics.entity';
import { Repository } from 'typeorm';
import { WordsResponseDto } from '../../utils/wordsResponse.dto';
export declare class BasicsService {
    private BasicsRepository;
    constructor(BasicsRepository: Repository<BasicsEntity>);
    findAll(): Promise<WordsResponseDto[]>;
}
