import { Prisma } from "@prisma/client";

export function parseOrderBy(orderBy?: string) {
    const parsedOrderBy = (orderBy ? JSON.parse(orderBy) : undefined) as
        | Prisma.locationsOrderByWithRelationInput
        | undefined;

    return parsedOrderBy;
}
