import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeerModule } from './peer/peer.module';
import { EventsModule } from './events/events.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MoodModule } from './mood/mood.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PeerModule,
    EventsModule,
    HealthModule,
    AuthModule,
    UsersModule,
    MoodModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
