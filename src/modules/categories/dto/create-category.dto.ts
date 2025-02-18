import { IsNumber, IsString } from "class-validator";
import { Category } from "src/modules/categories/entries";

export class CreateCategoryDto {
    @IsString()
    categoryName: Category["categoryName"];

    @IsString()
    categoryKey: Category["categoryKey"];

    @IsNumber()
    locationId: Category["locationId"];
}
