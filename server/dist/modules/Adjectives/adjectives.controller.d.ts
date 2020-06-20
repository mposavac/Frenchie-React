import { AdjectivesService } from './adjectives.service';
export declare class AdjectivesController {
    private readonly adjectivesService;
    constructor(adjectivesService: AdjectivesService);
    findAll(): Promise<import("../../utils/wordsResponse.dto").WordsResponseDto[]>;
}
