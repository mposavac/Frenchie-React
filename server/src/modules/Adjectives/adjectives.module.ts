import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdjectivesEntity } from './adjectives.entity';
import { AdjectivesController } from './adjectives.controller';
import { AdjectivesService } from './adjectives.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdjectivesEntity])],
  controllers: [AdjectivesController],
  providers: [AdjectivesService],
})
export class AdjectivesModule {}
