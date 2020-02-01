import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet()); // https://github.com/helmetjs/helmet
  app.enableCors(); // https://github.com/expressjs/cors
  app.use( // https://github.com/nfriedly/express-rate-limit
    rateLimit({
      // How long in milliseconds to keep records of requests in memory.
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );


  await app.listen(3001);
}
bootstrap();
