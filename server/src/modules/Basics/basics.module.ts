import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasicsEntity } from './basics.entity';
import { BasicsController } from './basics.controller';
import { BasicsService } from './basics.service';

@Module({
  imports: [TypeOrmModule.forFeature([BasicsEntity])],
  controllers: [BasicsController],
  providers: [BasicsService],
})
export class BasicsModule {}
