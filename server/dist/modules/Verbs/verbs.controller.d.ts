import { VerbsService } from './verbs.service';
import { WordsResponseDto } from 'src/utils/wordsResponse.dto';
export declare class VerbsController {
    private readonly verbsService;
    constructor(verbsService: VerbsService);
    findAll(): Promise<WordsResponseDto[]>;
}
