import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserCreate } from './dto';
import { Responser } from 'src/utils/Responser';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async userInviteService(data: UserCreate) {
    try {
      const isUserExisting = await this.prismaService.user.findFirst({
        where: {
          email: data.email,
        },
      });
      if (isUserExisting) {
        throw new HttpException(
          {
            message: 'User with the provided email already exists.',
            devMessage: 'email-already-used',
          },
          409,
        );
      } else {
        const token = await this.jwtService.signAsync(
          {
            name: data.name,
            email: data.email,
          },
          {
            secret: this.configService.get('JWT_REGISTER_SECRET'),
            expiresIn: '1d',
          },
        );
        await this.mailerService.sendMail({
          to: data.email,
          subject: 'Testing Nest Mailermodule with template ✔',
          template: 'register',
          context: {
            subject: 'User register',
            appURL: this.configService.get('APP_URL'),
            token: token,
          },
        });

        return Responser({
          statusCode: 201,
          message: 'User invited successfully.',
          devMessage: 'new-user-invited',
          body: null,
        });
      }
    } catch (err) {
      throw new HttpException(
        { message: 'Internal server error occurred', devMessage: err.message },
        500,
      );
    }
  }
}
