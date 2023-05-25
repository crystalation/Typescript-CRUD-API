import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.listen(3000, () => {
    console.log('3000번 포트로 연결되었습니다');
  });
}
bootstrap();
