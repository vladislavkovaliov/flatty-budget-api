import { IsString } from "class-validator";

export class CreateUsersDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly password: string;
    // readonly locations: any[];
    // readonly user_settings: any[];
}
