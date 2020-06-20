import { VerbsService } from './verbs.service';
export declare class VerbsController {
    private readonly verbsService;
    constructor(verbsService: VerbsService);
    findAll(): Promise<import("../../utils/wordsResponse.dto").WordsResponseDto[]>;
}
