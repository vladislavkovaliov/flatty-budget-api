import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

import { AppModule } from "src/modules";

import * as morgan from "morgan";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: console,
    });

    const config = new DocumentBuilder()
        .setTitle("Cats example")
        .setDescription("The cats API description")
        .setVersion("1.0")
        .addTag("cats")
        .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("api", app, documentFactory);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    app.use(morgan("dev"));

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
        }),
    );

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
