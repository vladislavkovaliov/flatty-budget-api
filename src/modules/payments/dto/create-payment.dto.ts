import { IsNumber, IsString } from "class-validator";
import { Payment } from "src/modules/payments/entities";

export class CreatePaymentDto {
    @IsNumber()
    amount: Payment["amount"];

    @IsString()
    description: Payment["description"];

    @IsString()
    currency: Payment["currency"];

    @IsString()
    paymentMethod: Payment["paymentMethod"];

    @IsNumber()
    categoryId: Payment["categoryId"];

    @IsNumber()
    locationId: Payment["locationId"];
}
