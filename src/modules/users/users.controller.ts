import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseArrayPipe,
    ParseIntPipe,
    Patch,
    Post,
    Query,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CreateUsersDto, UpdateUsersDto } from "./dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get("status")
    status() {
        return { status: 200 };
    }

    @Get()
    async findAll(
        @Query("skip", new ParseIntPipe({ optional: true })) skip: number,
        @Query("take", new ParseIntPipe({ optional: true })) take: number,
        @Query("orderBy", new DefaultValuePipe(undefined)) orderBy: string,
    ) {
        const parsedOrderBy = (orderBy ? JSON.parse(orderBy) : undefined) as
            | Prisma.usersOrderByWithRelationInput
            | undefined;

        const result = await this.usersService.getUsers({
            skip: skip,
            take: take,
            orderBy: parsedOrderBy,
        });

        return result;
    }

    @Get("by-name/:name")
    async findAllByName(@Param("name") name: string) {
        const result = await this.usersService.getUsers({
            where: {
                name: name,
            },
        });

        return result;
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
        const result = await this.usersService.user({
            id: id,
        });

        return result;
    }

    @Post()
    async create(@Body() createUsersDto: CreateUsersDto) {
        const result = await this.usersService.createUser(createUsersDto);

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
        @Body() body: UpdateUsersDto,
    ) {
        const result = await this.usersService.updateUsers({
            where: { id: id },
            data: { ...body },
        });

        return result;
    }

    @Delete("many")
    async deleteMany(
        @Query(
            "ids",
            new ParseArrayPipe({
                items: Number,
                separator: ",",
            }),
        )
        ids: number[],
    ) {
        const result = await this.usersService.removeManyUsers({
            where: { id: { in: ids } },
        });

        return result;
    }
}
