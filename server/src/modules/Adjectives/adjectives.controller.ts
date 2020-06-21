import { Controller, Get } from '@nestjs/common';
import { AdjectivesService } from './adjectives.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { WordsResponseDto } from 'src/utils/wordsResponse.dto';

@ApiTags('Adjectives')
@Controller('adjectives')
export class AdjectivesController {
  constructor(private readonly adjectivesService: AdjectivesService) {}

  @ApiOkResponse({
    description: 'OK.',
    isArray: true,
    type: WordsResponseDto,
  })
  @Get()
  findAll() {
    return this.adjectivesService.findAll();
  }
}
