import {
    Controller,
    DefaultValuePipe,
    Get,
    HttpStatus,
    ParseIntPipe,
    Query,
    Delete,
    Param,
    Body,
    Post,
    Patch,
    ParseArrayPipe,
} from "@nestjs/common";
import { LocationsService } from "src/modules/locations";
import { parseOrderBy } from "src/utils";
import {
    CreateLocationDto,
    UpdateLocationDto,
} from "src/modules/locations/dto";
import { Prisma } from "@prisma/client";

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
            orderBy:
                parseOrderBy<Prisma.locationsOrderByWithRelationInput>(orderBy),
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
        const result = await this.locationsService.location({ id: id });

        return result;
    }

    @Post()
    async create(@Body() createLocationDto: CreateLocationDto) {
        const result =
            await this.locationsService.createLocation(createLocationDto);

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
        @Body() updateLocationDto: UpdateLocationDto,
    ) {
        const result = await this.locationsService.updateLocation({
            where: { id: id },
            data: { ...updateLocationDto },
        });

        return result;
    }

    @Delete("many")
    async deleteMany(
        @Query("ids", new ParseArrayPipe({ items: Number, separator: "," }))
        ids: number[],
    ) {
        const result = await this.locationsService.removeManyLocations({
            where: { id: { in: ids } },
        });

        return result;
    }
}
