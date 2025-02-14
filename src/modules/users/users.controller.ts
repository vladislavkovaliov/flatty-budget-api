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
import { CreateUserDto, UpdateUserDto } from "src/modules/users/dto";
import { UsersService } from "src/modules/users/users.service";
import { parseOrderBy } from "src/utils";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get("status")
    status() {
        return { status: 200 };
    }

    // TODO: updates swagger query params make them optional as well
    @Get()
    async findAll(
        @Query("skip", new ParseIntPipe({ optional: true })) skip: number,
        @Query("take", new ParseIntPipe({ optional: true })) take: number,
        @Query("orderBy", new DefaultValuePipe(undefined)) orderBy: string,
    ) {
        const result = await this.usersService.getUsers({
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
    async create(@Body() createUserDto: CreateUserDto) {
        const result = await this.usersService.createUser(createUserDto);

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
        @Body() updateUserDto: UpdateUserDto,
    ) {
        const result = await this.usersService.updateUser({
            where: { id: id },
            data: { ...updateUserDto },
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
