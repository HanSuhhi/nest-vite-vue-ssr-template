import { createSSRApp } from "vue";
import { useRouteConfig } from "./router";
import App from "./App.vue";

import './style.css'

export function createApp() {
  const app = createSSRApp(App);
  const { router } = useRouteConfig();

  app.use(router);

  return { app, router };
}



