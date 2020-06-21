import { Controller, Get } from '@nestjs/common';
import { VerbsService } from './verbs.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { WordsResponseDto } from 'src/utils/wordsResponse.dto';

@ApiTags('Verbs')
@Controller('verbs')
export class VerbsController {
  constructor(private readonly verbsService: VerbsService) {}

  @ApiOkResponse({
    description: 'OK.',
    isArray: true,
    type: WordsResponseDto,
  })
  @Get()
  findAll() {
    return this.verbsService.findAll();
  }
}
