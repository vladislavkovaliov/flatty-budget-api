import { Module } from "@nestjs/common";
import { PrismaService } from "src/databases";
import { LocationsController, LocationsService } from "src/modules/locations";

@Module({
    controllers: [LocationsController],
    providers: [PrismaService, LocationsService],
})
export class LocationsModule {}
