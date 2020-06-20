import { Controller, Get } from '@nestjs/common';
import { BasicsService } from './basics.service';

@Controller('basics')
export class BasicsController {
  constructor(private readonly basicsService: BasicsService) {}

  @Get()
  findAll() {
    return this.basicsService.findAll();
  }
}
