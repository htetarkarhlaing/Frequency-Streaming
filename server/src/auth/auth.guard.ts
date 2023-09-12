import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new HttpException(
        { message: 'Unauthorized', devMessage: 'no-token-available' },
        401,
      );
    }
    try {
      const decoded = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      });
      request['user'] = decoded;
    } catch (err) {
      throw new HttpException(
        { message: 'Unauthorized', devMessage: err },
        401,
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
