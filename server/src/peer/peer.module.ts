import { Module } from '@nestjs/common';
import { ExpressPeerServer } from 'peer';
import * as express from 'express';
import { Server } from 'http';
import { ConfigService } from '@nestjs/config';

@Module({})
export class PeerModule {
  constructor(private configService: ConfigService) {
    const PORT = this.configService.get('PEER_PORT') || 9000;
    const app = express();
    const httpServer = new Server(app);
    const peerServer = ExpressPeerServer(httpServer, {
      path: 'peer',
    });
    app.use('peer', peerServer);

    httpServer.listen(PORT, () => {
      console.log(`PeerJS server is running on port ${PORT}`);
    });
  }
}
