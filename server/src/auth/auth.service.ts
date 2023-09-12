import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserLogin } from './dto';
import { Responser } from 'src/utils/Responser';
import { ConfigService } from '@nestjs/config';
import { hash, verify } from 'argon2';
import { IAuthRequest } from '../../@types/authRequest';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private async tokenGenerator(id: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: id,
        },
        {
          secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: '1d',
        },
      ),
      this.jwtService.signAsync(
        {
          id: id,
        },
        {
          secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async userAccountLogin(data: UserLogin) {
    try {
      const existingUser = await this.prismaService.user.findFirst({
        where: {
          email: data.email,
        },
      });
      if (existingUser) {
        if (existingUser.Status !== 'ACTIVE') {
          throw new HttpException(
            {
              message: 'User account is not eligible right now',
              devMessage: 'user-not-active',
            },
            401,
          );
        }

        const isPasswordMatch = await verify(
          existingUser.password,
          data.password,
        );
        if (isPasswordMatch) {
          const tokens = await this.tokenGenerator(existingUser.id);
          await this.prismaService.user.update({
            where: {
              id: existingUser.id,
            },
            data: {
              refreshToken: (await hash(tokens.refreshToken)).toString(),
            },
          });
          return Responser({
            statusCode: 200,
            message: 'User account login success.',
            devMessage: 'user-account-login-success',
            body: tokens,
          });
        } else {
          throw new HttpException(
            {
              message: 'User account password is not match',
              devMessage: 'user-password-not-match',
            },
            404,
          );
        }
      } else {
        throw new HttpException(
          {
            message: 'There is no user with provided email',
            devMessage: 'user-email-not-found',
          },
          404,
        );
      }
    } catch (err) {
      throw new HttpException(
        { message: 'Internal server error occurred', devMessage: err.message },
        500,
      );
    }
  }

  async userRequestMe(req: IAuthRequest) {
    try {
      const userInfo = await this.prismaService.user.findFirst({
        where: {
          id: req.user.id,
        },
        select: {
          id: true,
          email: true,
          Status: true,
          Profile: {
            select: {
              id: true,
              name: true,
              Image: {
                select: {
                  id: true,
                  name: true,
                  path: true,
                },
              },
              Mood: {
                select: {
                  id: true,
                  name: true,
                  Image: {
                    select: {
                      id: true,
                      name: true,
                      path: true,
                    },
                  },
                },
              },
            },
          },
          Channel: {
            where: {
              Status: 'ACTIVE',
            },
            select: {
              id: true,
              code: true,
              Cover: {
                select: {
                  id: true,
                  name: true,
                  path: true,
                },
              },
            },
          },
        },
      });
      return Responser({
        statusCode: 200,
        message: 'User account information fetched successfully.',
        devMessage: 'user-me-info',
        body: userInfo,
      });
    } catch (err) {
      throw new HttpException(
        { message: 'Internal server error occurred', devMessage: err.message },
        500,
      );
    }
  }
}
