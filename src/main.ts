import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import helmet from "@fastify/helmet";
import fastifyCsrf from "@fastify/csrf-protection";
import fastifyCookie from "@fastify/cookie";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.init();

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get<string>("CORS_ORIGIN"),
  });

  await app.register(fastifyCookie, {
    secret: configService.get("COOKIE_SECRET"),
  });
  await app.register(helmet, {
    contentSecurityPolicy: false,
  });
  await app.register(fastifyCsrf);
  const port = configService.get("PORT");
  const interfaces = configService.get("INTERFACE");

  await app.listen(port, interfaces);
}
bootstrap();
