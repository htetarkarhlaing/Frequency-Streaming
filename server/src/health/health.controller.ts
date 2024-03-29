import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @ApiTags('Health')
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.http.pingCheck('author', 'https://htetarkarhlaing.vamvamtech.com'),
    ]);
  }
}
