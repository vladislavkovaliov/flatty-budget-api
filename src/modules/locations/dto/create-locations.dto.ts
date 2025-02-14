import { IsNumber, IsString } from "class-validator";
import { Location } from "src/modules/locations/entries";

export class CreateLocationDto {
    @IsString()
    addressLine1: Location["addressLine1"];

    @IsNumber()
    userId: Location["userId"];
}
