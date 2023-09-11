import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiTags('Public')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/public/:fileName')
  @ApiTags('Public')
  publicFileResolver(@Param('fileName') name: string, @Res() res: Response) {
    return res.sendFile(name, { root: `./public/` });
  }

  @Get('/uploads/:fileName')
  @ApiTags('Public')
  uploadFileResolver(@Param('fileName') name: string, @Res() res: Response) {
    return res.sendFile(name, { root: `./uploads/` });
  }
}
