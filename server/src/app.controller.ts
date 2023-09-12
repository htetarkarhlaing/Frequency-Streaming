import { Controller, Get, Param, Res, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // @ApiTags('Public')
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  @ApiTags('Public')
  @Render('index')
  root() {
    return { message: 'Am I working ?' };
  }

  @Get('/uploads/:fileName')
  @ApiTags('Public')
  uploadFileResolver(@Param('fileName') name: string, @Res() res: Response) {
    return res.sendFile(name, { root: `./uploads/` });
  }
}
