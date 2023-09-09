import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeerModule } from './peer/peer.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PeerModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
