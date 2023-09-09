import { PipeTransform, Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any) {
    if (value) {
      if (value.size > 10 * 1024 * 1024) {
        throw new HttpException(
          {
            devMessage: 'Request Entity Too Large',
            message: 'File is too large to upload',
          },
          413,
        );
      } else {
        return value;
      }
    }
  }
}
