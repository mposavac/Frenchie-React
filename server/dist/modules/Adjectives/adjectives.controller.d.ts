import { AdjectivesService } from './adjectives.service';
import { WordsResponseDto } from 'src/utils/wordsResponse.dto';
export declare class AdjectivesController {
    private readonly adjectivesService;
    constructor(adjectivesService: AdjectivesService);
    findAll(): Promise<WordsResponseDto[]>;
}
