import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import { ConfigModule } from "@nestjs/config";

import { PrismaService } from "src/databases/prisma";
import { UsersModule } from "src/modules/users";
import { LocationsModule } from "src/modules/locations";
import { CategoriesModule } from "src/modules/categories";
import { PaymentsModule } from "src/modules/payments";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
    imports: [
        CacheModule.register(),
        ConfigModule.forRoot(),
        UsersModule,
        LocationsModule,
        CategoriesModule,
        PaymentsModule,
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
