import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseArrayPipe,
    ParseIntPipe,
    Patch,
    Post,
    Query,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PaymentsService } from "src/modules/payments/payments.service";
import { CreatePaymentDto, UpdatePaymentDto } from "src/modules/payments/dto";
import { parseOrderBy } from "src/utils";

@Controller("payments")
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

    // TODO: updates swagger query params make them optional as well
    @Get()
    async findAll(
        @Query("skip", new ParseIntPipe({ optional: true })) skip: number,
        @Query(
            "take",
            new DefaultValuePipe(10),
            new ParseIntPipe({ optional: true }),
        )
        take: number,
        @Query("orderBy", new DefaultValuePipe(undefined)) orderBy: string,
    ) {
        const result = await this.paymentsService.getPayments({
            skip: skip,
            take: take,
            orderBy:
                parseOrderBy<Prisma.paymentsOrderByWithRelationInput>(orderBy),
        });

        const meta = {
            skip: skip,
            take: take,
            ...{
                orderBy: orderBy ? (JSON.parse(orderBy) as unknown) : {},
            },
        };

        return {
            data: result,
            meta: meta,
        };
    }

    @Get(":id")
    async findOne(
        @Param(
            "id",
            new ParseIntPipe({
                errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
            }),
        )
        id: number,
    ) {
        const result = await this.paymentsService.payment({
            id: id,
        });

        return result;
    }

    @Post()
    async create(@Body() createPaymentDto: CreatePaymentDto) {
        const result =
            await this.paymentsService.createPayment(createPaymentDto);

        return result;
    }

    @Patch(":id")
    async update(
        @Param(
            "id",
            new ParseIntPipe({
                errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
            }),
        )
        id: number,
        @Body() updatePaymentDto: UpdatePaymentDto,
    ) {
        const result = await this.paymentsService.updatePayment({
            where: { id: id },
            data: { ...updatePaymentDto },
        });

        return result;
    }

    @Delete("many")
    async deleteMany(
        @Query(
            "ids",
            new ParseArrayPipe({
                items: Number,
                separator: ",",
            }),
        )
        ids: number[],
    ) {
        const result = await this.paymentsService.removeManyPayments({
            where: { id: { in: ids } },
        });

        return result;
    }
}
