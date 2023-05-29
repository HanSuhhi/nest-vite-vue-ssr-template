import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import * as compression from "compression";
import { Logger } from "@nestjs/common";
import { AppModule } from "./app.module";
import { getViteServer } from "./composables/vite-server";
import { resolveDistPath } from "./composables/path/path";
import { inNotTest } from "./composables/dev/test";
import { inNotProduction, inProduction } from "./composables/dev/production";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  await inProduction(async () => {
    app.use(compression());
    app.useStaticAssets(resolveDistPath("client"), {
      index: false
    });
  });

  await inNotProduction(async () => {
    const { middlewares } = await getViteServer();
    app.use(middlewares);
  });

  return app;
}

inNotTest(async () => {
  const app = await bootstrap();
  const logger = new Logger("main.ts");
  const port = 18200;

  app.listen(port, () => {
    logger.log(`server is running in: http://localhost:${port}`);
  });
});
