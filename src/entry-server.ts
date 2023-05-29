import { renderToString } from "vue/server-renderer";
import { createApp } from "./main";

export async function render() {
  const { app } = createApp();
  const appHtml = await renderToString(app);

  return {
    appHtml
  };
}
