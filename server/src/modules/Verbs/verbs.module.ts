import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerbsEntity } from './verbs.entity';
import { VerbsController } from './verbs.controller';
import { VerbsService } from './verbs.service';

@Module({
  imports: [TypeOrmModule.forFeature([VerbsEntity])],
  controllers: [VerbsController],
  providers: [VerbsService],
})
export class VerbsModule {}
