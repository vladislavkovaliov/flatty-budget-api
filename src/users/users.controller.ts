import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
} from "@nestjs/common";
import { UsersService } from "src/users/users.service";

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
    ) {
        const result = await this.usersService.users({
            skip: skip,
            take: take,
        });

        return result;
    }

    @Get("by-name/:name")
    async findAllByName(@Param("name") name: string) {
        const result = await this.usersService.users({
            where: {
                name: name,
            },
        });

        return result;
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return {
            id: id,
        };
    }

    // TODO: to avoid any type later
    @Post()
    create(@Body() body: any): any {
        return body;
    }
}
