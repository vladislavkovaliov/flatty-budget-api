import { Module } from "@nestjs/common";
import { PrismaService } from "src/databases";

import { UsersController, UsersService } from "src/modules/users";

@Module({
    imports: [],
    controllers: [UsersController],
    providers: [PrismaService, UsersService],
})
export class UsersModule {}
