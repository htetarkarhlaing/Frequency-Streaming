import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Responser } from 'src/utils/Responser';
import { MoodCreate } from './dto';

@Injectable()
export class MoodService {
  constructor(private readonly prismaService: PrismaService) {}

  async fetchAllMood() {
    const moodList = await this.prismaService.mood.findMany({
      where: {
        Status: 'ACTIVE',
      },
    });
    return Responser({
      statusCode: 200,
      message: 'Mood list fetched successfully.',
      devMessage: 'fetched-mood-list',
      body: moodList,
    });
    try {
    } catch (err) {
      throw new HttpException(
        { message: 'Internal server error occurred', devMessage: err.message },
        500,
      );
    }
  }

  async moodCreateService(data: MoodCreate, file: Express.Multer.File) {
    try {
      const { filename, path } = file;
      const createdMood = await this.prismaService.mood.create({
        data: {
          name: data.name,
          Image: {
            create: {
              name: filename,
              path: `${process.env.APP_URL}/uploads/${path}`,
            },
          },
        },
      });
      return Responser({
        statusCode: 201,
        message: 'New mood created successfully.',
        devMessage: 'new-mood-created',
        body: createdMood,
      });
    } catch (err) {
      throw new HttpException(
        { message: 'Internal server error occurred', devMessage: err.message },
        500,
      );
    }
  }
}
