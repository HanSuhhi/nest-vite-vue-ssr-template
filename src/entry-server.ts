import { basename } from "node:path";
import { renderToString } from "vue/server-renderer";
import type { RouteLocationRaw } from "vue-router";
import type { Manifest } from "vite";
import { createApp } from "./main";

export async function render(url: RouteLocationRaw, manifest: Manifest) {
  const { app, router } = createApp();

  await router.push(url);
  await router.isReady();

  const ctx = {};
  const appHtml = await renderToString(app, ctx);
  const preloadLinks = renderPreloadLinks((ctx as any).modules, manifest);

  return {
    appHtml,
    preloadLinks
  };
}

function renderPreloadLinks(modules: any, manifest: Manifest) {
  let links = "";
  const seen = new Set();
  modules.forEach((id: string) => {
    const files = manifest[id];
    if (files) {
      (files as any).forEach((file: string) => {
        if (!seen.has(file)) {
          seen.add(file);
          const filename = basename(file);
          if (manifest[filename]) {
            for (const depFile of (manifest as any)[filename]) {
              links += renderPreloadLink(depFile);
              seen.add(depFile);
            }
          }
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}

function renderPreloadLink(file: string) {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  }
  else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`;
  }
  else if (file.endsWith(".woff")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  }
  else if (file.endsWith(".woff2")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  }
  else if (file.endsWith(".gif")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
  }
  else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  }
  else if (file.endsWith(".png")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
  }
  else {
    // TODO
    return "";
  }
}
