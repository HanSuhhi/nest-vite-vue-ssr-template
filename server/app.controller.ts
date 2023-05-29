import { Request } from "express";
import { Controller, Get, Header, Req } from "@nestjs/common";
import { AppService } from "./app.service";
import { useClientRoutes } from "./composables/path/clientPath";

const ROUTES_PATH = useClientRoutes();

@Controller(ROUTES_PATH)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header("Content-Type", "text/html")
  async renderApp(@Req() request: Request): Promise<string> {
    const url = request.originalUrl;
    const { html, render, manifest } = await this.appService.renderApp(url);
    const { appHtml,  preloadLinks } = await render(url, manifest);

    return html
      .replace("<!--ssr-outlet-->", appHtml)
      .replace("<!--preload-links-->", preloadLinks)
  }
}
