import { NounsService } from './nouns.service';
import { WordsResponseDto } from 'src/utils/wordsResponse.dto';
export declare class NounsController {
    private readonly nounsService;
    constructor(nounsService: NounsService);
    findAll(): Promise<WordsResponseDto[]>;
}
