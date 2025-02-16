import { IsString } from "class-validator";
import { Location } from "src/modules/locations/entries";

export class UpdateLocationDto {
    @IsString()
    readonly addressLine1: Location["addressLine1"];
    addressLine2: Location["addressLine2"];
    city: Location["city"];
    state: Location["state"];
    postalCode: Location["postalCode"];
    country: Location["country"];
    userId: Location["userId"];
    latitude: Location["latitude"];
    longitude: Location["longitude"];
    updateAt: Location["updateAt"];
    createAt: Location["createAt"];
}
