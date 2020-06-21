import { BasicsService } from './basics.service';
import { WordsResponseDto } from 'src/utils/wordsResponse.dto';
export declare class BasicsController {
    private readonly basicsService;
    constructor(basicsService: BasicsService);
    findAll(): Promise<WordsResponseDto[]>;
}
