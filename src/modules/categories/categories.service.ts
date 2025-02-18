import { Prisma } from "@prisma/client";

import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/databases";
import { Category } from "src/modules/categories/entries";

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) {}

    async createCategory(data: Prisma.categoriesCreateInput) {
        return this.prisma.categories.create({ data: data });
    }

    async category(
        categoriesWhereUniqueInput: Prisma.categoriesWhereUniqueInput,
    ) {
        return this.prisma.categories.findUnique({
            where: categoriesWhereUniqueInput,
        });
    }

    async getCategories(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.categoriesWhereUniqueInput;
        where?: Prisma.categoriesWhereInput;
        orderBy?: Prisma.categoriesOrderByWithRelationInput;
    }): Promise<Category[]> {
        const { skip, take, cursor, where, orderBy } = params;

        return this.prisma.categories.findMany({
            skip: skip,
            take: take,
            cursor: cursor,
            where: where,
            orderBy: orderBy,
        });
    }

    async updateCategory({
        where,
        data,
    }: {
        where: Prisma.categoriesWhereUniqueInput;
        data: Prisma.categoriesUpdateInput;
    }) {
        return this.prisma.categories.update({ where: where, data: data });
    }

    async removeLocations({
        where,
    }: {
        where: Prisma.categoriesWhereUniqueInput;
    }) {
        return this.prisma.categories.delete({ where: where });
    }

    async removeManyCategories({
        where,
    }: {
        where: Prisma.categoriesWhereInput;
    }) {
        return this.prisma.categories.deleteMany({ where: where });
    }
}
