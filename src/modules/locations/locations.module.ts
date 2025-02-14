import { Module } from "@nestjs/common";
import { LocationsController, LocationsService } from "src/modules/locations";

@Module({
    controllers: [LocationsController],
    providers: [LocationsService],
})
export class LocationsModule {}
