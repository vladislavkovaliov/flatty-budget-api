import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/databases";
import { Payment } from "src/modules/payments/entities";

@Injectable()
export class PaymentsService {
    constructor(private prisma: PrismaService) {}

    async createPayment(data: Prisma.paymentsCreateInput) {
        return this.prisma.payments.create({
            data: data,
        });
    }

    async payment(
        paymentsWhereUniqueInput: Prisma.paymentsWhereUniqueInput,
    ): Promise<Payment | null> {
        return this.prisma.payments.findUnique({
            where: paymentsWhereUniqueInput,
        });
    }

    async getPayments(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.paymentsWhereUniqueInput;
        where?: Prisma.paymentsWhereInput;
        orderBy?: Prisma.paymentsOrderByWithRelationInput;
    }): Promise<Payment[]> {
        const { skip, take, cursor, where, orderBy } = params;

        return this.prisma.payments.findMany({
            skip: skip,
            take: take,
            cursor: cursor,
            where: where,
            orderBy: orderBy,
        });
    }

    async updatePayment({
        where,
        data,
    }: {
        where: Prisma.paymentsWhereUniqueInput;
        data: Prisma.paymentsUpdateInput;
    }) {
        return this.prisma.payments.update({
            data: data,
            where: where,
        });
    }

    async removePayments({
        where,
    }: {
        where: Prisma.paymentsWhereUniqueInput;
    }) {
        return this.prisma.payments.delete({ where: where });
    }

    async removeManyPayments({ where }: { where: Prisma.paymentsWhereInput }) {
        return this.prisma.payments.deleteMany({ where: where });
    }
}
