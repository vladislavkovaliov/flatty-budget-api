import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "src/app.controller";
import { AppService } from "src/app.service";
import { PrismaService } from "src/prisma";
import { UsersModule } from "src/users";

@Module({
    imports: [CacheModule.register(), ConfigModule.forRoot(), UsersModule],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
