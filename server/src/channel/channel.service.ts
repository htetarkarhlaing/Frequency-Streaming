import { HttpException, Injectable } from '@nestjs/common';
import { IAuthRequest } from '../../@types/authRequest';
import { PrismaService } from 'src/prisma.service';
import { Responser } from 'src/utils/Responser';

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
}
