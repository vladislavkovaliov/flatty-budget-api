import { IsString } from "class-validator";
import { User } from "src/modules/users/entities";

export class UpdateUserDto {
    @IsString()
    readonly name: User["name"];

    @IsString()
    readonly password: User["password"];
}
