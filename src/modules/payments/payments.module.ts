import { Module } from "@nestjs/common";
import { PaymentsController, PaymentsService } from "src/modules/payments";
import { PrismaService } from "src/databases";

@Module({
    controllers: [PaymentsController],
    providers: [PrismaService, PaymentsService],
})
export class PaymentsModule {}
