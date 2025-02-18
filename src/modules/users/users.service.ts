import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "src/databases";
import { User } from "src/modules/users/entities";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(data: Prisma.usersCreateInput): Promise<User> {
        return this.prisma.users.create({
            data: data,
        });
    }

    async user(
        usersWhereUniqueInput: Prisma.usersWhereUniqueInput,
    ): Promise<User | null> {
        return this.prisma.users.findUnique({
            where: usersWhereUniqueInput,
        });
    }

    async getUsers(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.usersWhereUniqueInput;
        where?: Prisma.usersWhereInput;
        orderBy?: Prisma.usersOrderByWithRelationInput;
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params;

        return this.prisma.users.findMany({
            skip: skip,
            take: take,
            cursor: cursor,
            where: where,
            orderBy: orderBy,
        });
    }

    async updateUser({
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

    async removeUsers({ where }: { where: Prisma.usersWhereUniqueInput }) {
        return this.prisma.users.delete({
            where: where,
        });
    }

    async removeManyUsers({ where }: { where: Prisma.usersWhereInput }) {
        return this.prisma.users.deleteMany({
            where: where,
        });
    }
}
