import { Module } from '@nestjs/common';
import { MoodService } from './mood.service';
import { MoodController } from './mood.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MoodController],
  providers: [MoodService, PrismaService],
})
export class MoodModule {}
