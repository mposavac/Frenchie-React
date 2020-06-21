import { Controller, Get } from '@nestjs/common';
import { NounsService } from './nouns.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { WordsResponseDto } from 'src/utils/wordsResponse.dto';

@ApiTags('Nouns')
@Controller('nouns')
export class NounsController {
  constructor(private readonly nounsService: NounsService) {}

  @ApiOkResponse({
    description: 'OK.',
    isArray: true,
    type: WordsResponseDto,
  })
  @Get()
  findAll() {
    return this.nounsService.findAll();
  }
}
