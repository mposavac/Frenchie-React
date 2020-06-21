import { Controller, Get } from '@nestjs/common';
import { BasicsService } from './basics.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { WordsResponseDto } from 'src/utils/wordsResponse.dto';

@ApiTags('Basics')
@Controller('basics')
export class BasicsController {
  constructor(private readonly basicsService: BasicsService) {}

  @ApiOkResponse({
    description: 'OK.',
    isArray: true,
    type: WordsResponseDto,
  })
  @Get()
  findAll() {
    return this.basicsService.findAll();
  }
}
