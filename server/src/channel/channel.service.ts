import { HttpException, Injectable } from '@nestjs/common';
import { IAuthRequest } from 'src/@types/authRequest';
import { PrismaService } from 'src/prisma.service';
import { Responser } from 'src/utils/Responser';
import { ChannelCreate } from './dto';

@Injectable()
export class ChannelService {
  constructor(private readonly prismaService: PrismaService) {}

  async fetchAllUserChannels(req: IAuthRequest) {
    try {
      const channelList = await this.prismaService.channel.findMany({
        where: {
          AND: [
            {
              Status: 'ACTIVE',
            },
            {
              createdById: req.user.id,
            },
          ],
        },
        select: {
          id: true,
          name: true,
          code: true,
          Cover: {
            select: {
              id: true,
              name: true,
              path: true,
            },
          },
          ChannelParticipant: {
            select: {
              id: true,
              ParticipantRole: true,
              User: {
                where: {
                  Status: 'ACTIVE',
                },
                select: {
                  id: true,
                  email: true,
                  Profile: {
                    select: {
                      name: true,
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
            },
          },
        },
      });
      return Responser({
        statusCode: 200,
        message: 'Channel list fetched successfully.',
        devMessage: 'fetched-channel-list',
        body: channelList,
      });
    } catch (err) {
      throw new HttpException(
        { message: 'Internal server error occurred', devMessage: err.message },
        500,
      );
    }
  }

  async createNewChannel(
    data: ChannelCreate,
    file: Express.Multer.File,
    req: IAuthRequest,
  ) {
    try {
      const codeList = await this.prismaService.channel
        .findMany({
          select: {
            code: true,
          },
        })
        .then((channelCodes) => channelCodes.map((code) => code.code));

      const codeGenerator = async () => {
        const newCode = Math.floor(100000 + Math.random() * 900000).toString();
        if (codeList.includes(newCode)) {
          await codeGenerator();
        } else {
          return newCode;
        }
      };

      const { filename, path } = file;
      const createdChannel = await this.prismaService.channel.create({
        data: {
          name: data.name,
          CreatedBy: {
            connect: {
              id: req.user.id,
            },
          },
          Cover: {
            create: {
              name: filename,
              path: `${process.env.APP_URL}/uploads/${path}`,
            },
          },
          code: await codeGenerator(),
        },
      });
      return Responser({
        statusCode: 201,
        message: 'New channel created successfully.',
        devMessage: 'new-channel-created',
        body: createdChannel,
      });
    } catch (err) {
      throw new HttpException(
        { message: 'Internal server error occurred', devMessage: err.message },
        500,
      );
    }
  }
}
