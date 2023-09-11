import { HttpException } from '@nestjs/common';

interface responseInterface {
  statusCode: number;
  message: string;
  body: any;
  devMessage?: string;
}

export const Responser = ({
  statusCode,
  message,
  devMessage,
  body,
}: responseInterface) => {
  return {
    meta: {
      success: statusCode >= 200 && statusCode <= 300 ? true : false,
      devMessage: devMessage,
      message: message,
    },
    body: body,
  };
  throw new HttpException('User Not Found', 404);
};
