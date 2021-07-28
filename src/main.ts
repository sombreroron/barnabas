import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const port = process.env.PORT || 9999;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bodyParser: false,
    });

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
    app.use(
        bodyParser.json({
            type: ['application/json', 'text/plain'],
            limit: '100mb',
        }),
    );

    const options = new DocumentBuilder()
        .setTitle('Barnabas')
        .setDescription('A Kafka messenger')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(port);
}

bootstrap();
