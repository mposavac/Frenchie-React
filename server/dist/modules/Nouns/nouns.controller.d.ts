import { NounsService } from './nouns.service';
export declare class NounsController {
    private readonly nounsService;
    constructor(nounsService: NounsService);
    findAll(): Promise<import("../../utils/wordsResponse.dto").WordsResponseDto[]>;
}
