import { Injectable } from '@nestjs/common';
import { Prisma, users } from '@prisma/client';

import { PrismaService } from 'src/prisma';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.usersWhereUniqueInput;
    where?: Prisma.usersWhereInput;
    orderBy?: Prisma.usersOrderByWithRelationInput;
  }): Promise<users[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.users.findMany({
      skip: skip,
      take: take,
      cursor: cursor,
      where: where,
      orderBy: orderBy,
    });
  }
}
