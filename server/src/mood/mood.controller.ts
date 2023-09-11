import {
  Body,
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ApiOperation, ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MoodCreate } from './dto';
import { FileSizeValidationPipe } from '../utils/FileInterceptor';
import { MoodService } from './mood.service';

@Controller('mood')
export class MoodController {
  constructor(private readonly moodService: MoodService) {}

  @Get()
  @ApiTags('Mood')
  async fetAllMood() {
    return this.moodService.fetchAllMood();
  }

  @Post('new')
  @ApiTags('Mood')
  @ApiBody({
    description: 'Create New Mood',
    type: MoodCreate,
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create New Mood' })
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
    @Body() body: MoodCreate,
    @UploadedFile(new FileSizeValidationPipe()) file: Express.Multer.File,
  ): Promise<any> {
    return this.moodService.moodCreateService(body, file);
  }
}
