import { Module } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { UsersController } from 'src/users/users.controller';
import { PrismaService } from 'src/prisma';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [PrismaService, UsersService],
})
export class UsersModule {}
