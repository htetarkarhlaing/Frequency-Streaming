import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  UseInterceptors,
  Body,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { ChannelService } from './channel.service';
import { IAuthRequest } from 'src/@types/authRequest';
import { AuthGuard } from 'src/auth/auth.guard';
import { ChannelCreate } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileSizeValidationPipe } from 'src/utils/FileInterceptor';

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

  @Post('new')
  @ApiTags('Channel')
  @ApiBody({
    description: 'Create New Channel',
    type: ChannelCreate,
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create New Channel' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, callBack) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callBack(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async createNewMood(
    @Body() body: ChannelCreate,
    @UploadedFile(new FileSizeValidationPipe()) file: Express.Multer.File,
    @Req() req: IAuthRequest,
  ): Promise<any> {
    return this.channelService.createNewChannel(body, file, req);
  }
}
