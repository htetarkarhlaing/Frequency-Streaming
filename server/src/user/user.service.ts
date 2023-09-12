import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserCreate } from './dto';
import { Responser } from 'src/utils/Responser';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async userInviteService(data: UserCreate) {
    try {
      return Responser({
        statusCode: 201,
        message: 'User invited successfully.',
        devMessage: 'new-user-invited',
        body: null,
      });
    } catch (err) {
      throw new HttpException(
        { message: 'Internal server error occurred', devMessage: err.message },
        500,
      );
    }
  }
}
