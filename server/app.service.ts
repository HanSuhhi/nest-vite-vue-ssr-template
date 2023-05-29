import { Injectable } from "@nestjs/common";
import type { Manifest } from "vite";
import { IS_PRODUCTION } from "./composables/constants/dev";
import { resolveClientPath, resolveDistPath, resolveRootPath } from "./composables/path/path";
import { getViteServer } from "./composables/vite-server";
import { readFileSyncUTF8 } from "./composables/fs/readFile";

@Injectable()
export class AppService {
  /**
   * Render the app for the given URL.
   * @param {string} url The original request URL.
   * @returns {Promise<Object>} The rendering result.
   */
  public async renderApp(url: string) {
    const html = await this.getHtmlTemplate(url);
    const render = await this.getRender();
    const manifest = await this.getManifest();

    return { html, render, manifest };
  }

  /**
   * Get the HTML template for the given URL.
   * @param {string} url The original request URL.
   * @returns {Promise<string>} The HTML template string.
   */
  private async getHtmlTemplate(url: string): Promise<string> {
    const { transformIndexHtml } = await getViteServer();
    const html = IS_PRODUCTION
      ? readFileSyncUTF8(resolveDistPath("client", "index.html"))
      : await transformIndexHtml(url, readFileSyncUTF8(resolveRootPath("index.html")));

    return html;
  }

  /**
   * Get the render function for server-side rendering.
   * @returns {Promise<Function>} The render function.
   */
  private async getRender(): Promise<Function> {
    const { ssrLoadModule } = await getViteServer();
    const { render } = IS_PRODUCTION
      ? (await import(resolveDistPath("middleware", "entry-server.js")))
      : (await ssrLoadModule(resolveClientPath("entry-server.ts")));

    return render;
  }

  /**
   * Get the server-side rendering manifest.
   * @returns {Promise<Object>} The SSR manifest object.
   */
  private async getManifest(): Promise<Manifest> {
    const manifest: Manifest = IS_PRODUCTION
      ? JSON.parse(readFileSyncUTF8(resolveDistPath("client", "ssr-manifest.json")))
      : {};

    return manifest;
  }
}
