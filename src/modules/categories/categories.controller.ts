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
import { CategoriesService } from "src/modules/categories/categories.service";
import {
    CreateCategoryDto,
    UpdateCategoryDto,
} from "src/modules/categories/dto";
import { parseOrderBy } from "src/utils";

@Controller("categories")
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

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
        const result = await this.categoriesService.getCategories({
            skip: skip,
            take: take,
            orderBy:
                parseOrderBy<Prisma.categoriesOrderByWithRelationInput>(
                    orderBy,
                ),
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
        const result = await this.categoriesService.category({ id: id });

        return result;
    }

    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        const result =
            await this.categoriesService.createCategory(createCategoryDto);

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
        @Body() updateCategoryDto: UpdateCategoryDto,
    ) {
        const result = await this.categoriesService.updateCategory({
            where: { id: id },
            data: { ...updateCategoryDto },
        });

        return result;
    }

    @Delete("many")
    async deleteMany(
        @Query("ids", new ParseArrayPipe({ items: Number, separator: "," }))
        ids: number[],
    ) {
        const result = await this.categoriesService.removeManyCategories({
            where: { id: { in: ids } },
        });

        return result;
    }
}
