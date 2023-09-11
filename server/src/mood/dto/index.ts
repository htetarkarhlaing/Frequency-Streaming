import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Create {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  image: any;
}
