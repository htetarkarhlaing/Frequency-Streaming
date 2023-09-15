import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ChannelService } from './channel.service';
import { IAuthRequest } from '../../@types/authRequest';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  @ApiTags('Channel')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'User Request Channel List' })
  async fetAllMood(@Req() req: IAuthRequest) {
    return this.channelService.fetchAllUserChannels(req);
  }
}
