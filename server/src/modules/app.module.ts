import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AdjectivesModule } from './Adjectives/adjectives.module';
import { NounsModule } from './Nouns/nouns.module';
import { VerbsModule } from './Verbs/verbs.module';
import { BasicsModule } from './Basics/basics.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AdjectivesModule,
    NounsModule,
    VerbsModule,
    BasicsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
