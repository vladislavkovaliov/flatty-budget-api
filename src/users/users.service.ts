import { Injectable } from "@nestjs/common";
import { Prisma, users } from "@prisma/client";

import { PrismaService } from "src/prisma";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(data: Prisma.usersCreateInput): Promise<users> {
        return this.prisma.users.create({
            data: data,
        });
    }

    async user(
        usersWhereUniqueInput: Prisma.usersWhereUniqueInput,
    ): Promise<users | null> {
        return this.prisma.users.findUnique({
            where: usersWhereUniqueInput,
        });
    }

    async users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.usersWhereUniqueInput;
        where?: Prisma.usersWhereInput;
        orderBy?: Prisma.usersOrderByWithRelationInput;
    }): Promise<users[]> {
        const { skip, take, cursor, where, orderBy } = params;

        return this.prisma.users.findMany({
            skip: skip,
            take: take,
            cursor: cursor,
            where: where,
            orderBy: orderBy,
        });
    }

    async updateUsers({
        where,
        data,
    }: {
        where: Prisma.usersWhereUniqueInput;
        data: Prisma.usersUpdateInput;
    }) {
        return this.prisma.users.update({
            data: data,
            where: where,
        });
    }
}
