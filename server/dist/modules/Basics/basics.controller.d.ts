import { BasicsService } from './basics.service';
export declare class BasicsController {
    private readonly basicsService;
    constructor(basicsService: BasicsService);
    findAll(): Promise<import("../../utils/wordsResponse.dto").WordsResponseDto[]>;
}
