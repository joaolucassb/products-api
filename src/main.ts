import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { runSeed } from './seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    await runSeed();
  }

  app.enableCors({
    origin: 'http://localhost:5173', // frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
