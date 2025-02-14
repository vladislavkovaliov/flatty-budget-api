import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/databases";
import { Location } from "src/modules/locations/entries";

@Injectable()
export class LocationsService {
    constructor(private prisma: PrismaService) {}

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
}
