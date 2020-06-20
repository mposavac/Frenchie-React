import { Controller, Get } from '@nestjs/common';
import { AdjectivesService } from './adjectives.service';

@Controller('adjectives')
export class AdjectivesController {
  constructor(private readonly adjectivesService: AdjectivesService) {}

  @Get()
  findAll() {
    return this.adjectivesService.findAll();
  }
}
