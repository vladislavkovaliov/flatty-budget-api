import {
    Controller,
    DefaultValuePipe,
    Get,
    ParseIntPipe,
    Query,
} from "@nestjs/common";
import { LocationsService } from "src/modules/locations";
import { parseOrderBy } from "src/utils";

@Controller("locations")
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) {}

    @Get()
    async findAll(
        @Query(
            "skip",
            new DefaultValuePipe(undefined),
            new ParseIntPipe({ optional: true }),
        )
        skip: number,
        @Query(
            "take",
            new DefaultValuePipe(10),
            new ParseIntPipe({ optional: true }),
        )
        take: number,
        @Query("orderBy", new DefaultValuePipe(undefined)) orderBy: string,
    ) {
        const result = await this.locationsService.getLocations({
            skip: skip,
            take: take,
            orderBy: parseOrderBy(orderBy),
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
}
