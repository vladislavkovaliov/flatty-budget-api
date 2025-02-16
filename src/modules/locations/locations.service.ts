import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/databases";
import { Location } from "src/modules/locations/entries";

@Injectable()
export class LocationsService {
    constructor(private prisma: PrismaService) {}

    async createLocation(data: Prisma.locationsCreateInput) {
        return this.prisma.locations.create({
            data: data,
        });
    }

    async location(
        locationsWhereUniqueInput: Prisma.locationsWhereUniqueInput,
    ): Promise<Location | null> {
        return this.prisma.locations.findUnique({
            where: locationsWhereUniqueInput,
        });
    }

    async getLocations(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.locationsWhereUniqueInput;
        where?: Prisma.locationsWhereInput;
        orderBy?: Prisma.locationsOrderByWithRelationInput;
    }): Promise<Location[]> {
        const { skip, take, cursor, where, orderBy } = params;

        return this.prisma.locations.findMany({
            skip: skip,
            take: take,
            cursor: cursor,
            where: where,
            orderBy: orderBy,
        });
    }

    async updateLocation({
        where,
        data,
    }: {
        where: Prisma.locationsWhereUniqueInput;
        data: Prisma.locationsUpdateInput;
    }) {
        return this.prisma.locations.update({
            data: data,
            where: where,
        });
    }

    async removeLocations({
        where,
    }: {
        where: Prisma.locationsWhereUniqueInput;
    }) {
        return this.prisma.locations.delete({ where: where });
    }

    async removeManyLocations({
        where,
    }: {
        where: Prisma.locationsWhereInput;
    }) {
        return this.prisma.locations.deleteMany({ where: where });
    }
}
