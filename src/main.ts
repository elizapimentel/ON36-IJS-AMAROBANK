import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from 'data-source';

async function bootstrap() {

  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');
  } catch (error) {
    console.error('Error during Data Source initialization:', error);
    process.exit(1); 
  }

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
