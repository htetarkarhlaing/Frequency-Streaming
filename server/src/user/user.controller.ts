import { Body, Controller, Post, Get } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserCreate } from './dto';

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
}
