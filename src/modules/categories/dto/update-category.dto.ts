import { IsString, IsNumber } from "class-validator";
import { Category } from "src/modules/categories/entries";

// TODO: extends by fields updateAt and createAt
// they have to be updated via patch http method

export class UpdateCategoryDto {
    @IsString()
    readonly categoryName: Category["categoryName"];

    @IsString()
    readonly categoryKey: Category["categoryKey"];

    @IsNumber()
    readonly locationId: Category["locationId"];
}
