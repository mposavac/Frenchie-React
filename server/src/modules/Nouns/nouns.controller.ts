import { Controller, Get } from '@nestjs/common';
import { NounsService } from './nouns.service';

@Controller('nouns')
export class NounsController {
  constructor(private readonly nounsService: NounsService) {}

  @Get()
  findAll() {
    return this.nounsService.findAll();
  }
}
