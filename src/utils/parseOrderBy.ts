export function parseOrderBy<T>(orderBy?: string) {
    const parsedOrderBy = (orderBy ? JSON.parse(orderBy) : undefined) as
        | T
        | undefined;

    return parsedOrderBy;
}
