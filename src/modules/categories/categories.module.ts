import { Module } from "@nestjs/common";
import { PrismaService } from "src/databases";
import {
    CategoriesController,
    CategoriesService,
} from "src/modules/categories";

@Module({
    imports: [],
    controllers: [CategoriesController],
    providers: [PrismaService, CategoriesService],
})
export class CategoriesModule {}
