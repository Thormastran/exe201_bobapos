import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const frontendOrigin = config.get<string>("FRONTEND_ORIGIN") ?? "http://localhost:3001";

  app.setGlobalPrefix("api");
  app.enableCors({
    origin: [frontendOrigin, "http://localhost:3000", "http://localhost:3001"],
    credentials: true
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = config.get<number>("PORT") ?? 4000;
  await app.listen(port);
}

bootstrap();
