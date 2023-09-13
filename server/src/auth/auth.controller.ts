import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserLogin } from './dto';
import { IAuthRequest } from '../../@types/authRequest';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiTags('Auth')
  @ApiBody({
    description: 'User Account Login',
    type: UserLogin,
  })
  @ApiOperation({ summary: 'User Account Login' })
  async userLogin(@Body() body: UserLogin): Promise<any> {
    return this.authService.userAccountLogin(body);
  }

  @Get('who-am-i')
  @ApiTags('Auth')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'User Request Info' })
  async userRequestMe(@Req() req: IAuthRequest): Promise<any> {
    return this.authService.userRequestMe(req);
  }

  @Get('refresh-tokens')
  @ApiTags('Auth')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'User Revalidate Token' })
  async userRefreshToken(@Req() req: IAuthRequest): Promise<any> {
    return this.authService.userValidateRefreshToken(req);
  }
}
