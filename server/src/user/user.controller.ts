import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  UserCreate,
  UserConfirm,
  UserForgotPassword,
  UserConfirmNewPassword,
} from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiTags('User')
  @ApiBody({
    description: 'User Register',
    type: UserCreate,
  })
  @ApiOperation({ summary: 'User Register' })
  async createNewUser(@Body() body: UserCreate): Promise<any> {
    return this.userService.userInviteService(body);
  }

  @Post('confirm')
  @ApiTags('User')
  @ApiBody({
    description: 'User Account Confirmation',
    type: UserConfirm,
  })
  @ApiOperation({ summary: 'User Account Confirmation' })
  async userConfirm(@Body() body: UserConfirm): Promise<any> {
    return this.userService.userAccountConfirm(body);
  }

  @Post('forgot-password')
  @ApiTags('User')
  @ApiBody({
    description: 'User Account Request Forgot Password Reset Link',
    type: UserForgotPassword,
  })
  @ApiOperation({ summary: 'User Account Request Forgot Password Reset Link' })
  async userForgotPassword(@Body() body: UserForgotPassword): Promise<any> {
    return this.userService.userRequestPasswordResetService(body);
  }

  @Post('new-password-confirm')
  @ApiTags('User')
  @ApiBody({
    description: 'User Account Update New Password',
    type: UserConfirmNewPassword,
  })
  @ApiOperation({ summary: 'User Account Update New Password' })
  async userUpdateNewResetPassword(
    @Body() body: UserConfirmNewPassword,
  ): Promise<any> {
    return this.userService.userConfirmNewPasswordService(body);
  }
}
